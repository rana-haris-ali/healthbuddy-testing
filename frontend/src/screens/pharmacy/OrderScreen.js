import React, { useEffect, useState } from 'react';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PayPalButton } from 'react-paypal-button-v2';
import axios from 'axios';

import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
	ORDER_PAY_RESET,
	ORDER_DELIVER_RESET,
} from '../../constants/orderConstants';
import {
	getSingleOrder,
	payOrder,
	deliverOrder,
} from '../../actions/pharmacy/orderActions';

// Order details screen shown after order is placed

const OrderScreen = ({ match, history }) => {
	const orderId = match.params.id;

	const [sdkReady, setSdkReady] = useState(false);

	const dispatch = useDispatch();

	const { userInfo } = useSelector((state) => state.userLogin);

	const { order, loading, error } = useSelector((state) => state.orderDetails);

	const {
		loading: loadingPay,
		success: successPay,
		error: errorPay,
	} = useSelector((state) => state.orderPay);

	const {
		loading: loadingDeliver,
		success: successDeliver,
		error: errorDeliver,
	} = useSelector((state) => state.orderDeliver);

	useEffect(() => {
		if (!userInfo) {
			history.push('/login');
		}

		const addPayPalScript = async () => {
			const { data: clientId } = await axios.get('/api/config/paypal');
			const script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
			script.async = true;
			script.onload = () => {
				setSdkReady(true);
			};
			document.body.appendChild(script);
		};
		if (!order || successPay || successDeliver) {
			dispatch({ type: ORDER_PAY_RESET });
			dispatch({ type: ORDER_DELIVER_RESET });
			dispatch(getSingleOrder(orderId));
		} else if (!order.isPaid) {
			if (!window.paypal) {
				addPayPalScript();
			} else {
				setSdkReady(true);
			}
		}
	}, [dispatch, history, orderId, successPay, successDeliver, order, userInfo]);

	const paymentSuccessHandler = (paymentResult) => {
		dispatch(payOrder(orderId, paymentResult));
	};

	const deliverHandler = () => {
		dispatch(deliverOrder(orderId));
	};

	return loading ? (
		<Loader />
	) : error ? (
		<Message variant='danger'>{error}</Message>
	) : (
		<>
			<h1>Order {order._id}</h1>
			<Row>
				<Col md={8}>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>Shipping</h2>
							<p>
								<strong>Name: </strong>
								{order.user.name}
							</p>
							<p>
								<strong>Email: </strong>
								<a href={`mailto:${order.user.email}`}>{order.user.email}</a>
							</p>
							<p>
								<strong>Address: </strong>
								{order.shippingAddress.address}, {order.shippingAddress.city},{' '}
								{order.shippingAddress.country}
							</p>
							{order.isDelivered ? (
								<Message variant='success'>
									Delivered on {order.deliveredOn.substring(0, 10)}
								</Message>
							) : (
								<Message variant='danger'>Not Delivered</Message>
							)}
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Payment Method</h2>
							<p>
								<strong>Method: </strong>
								{order.paymentMethod}
							</p>
							{order.isPaid ? (
								<Message variant='success'>
									Paid on {order.paidOn.substring(0, 10)}
								</Message>
							) : (
								<Message variant='danger'>Not Paid</Message>
							)}
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Order Items</h2>
							{order.orderItems.length === 0 ? (
								<Message>Order is empty</Message>
							) : (
								<ListGroup variant='flush'>
									{order.orderItems.map((item, index) => (
										<ListGroup.Item key={index}>
											<Row>
												<Col md={1}>
													<Image
														className='place-order-screen-image'
														src={item.image}
														alt={item.name}
														fluid
													></Image>
												</Col>
												<Col>
													<Link to={`/products/${item.productId}`}>
														{item.name}
													</Link>
												</Col>

												<Col md={4}>
													{item.qty} x Rs. {item.price} = Rs.{' '}
													{item.qty * item.price}
												</Col>
											</Row>
										</ListGroup.Item>
									))}
								</ListGroup>
							)}
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={4}>
					<Card>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h2 className='text-center'>Order Summary</h2>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Net Amount:</Col>
									<Col>Rs. {order.netAmount}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Shipping Amount:</Col>
									<Col>Rs. {order.shippingAmount}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Tax Amount:</Col>
									<Col>Rs. {order.taxAmount}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<strong>
									<Row>
										<Col>Total Amount:</Col>
										<Col>Rs. {order.totalAmount}</Col>
									</Row>
								</strong>
							</ListGroup.Item>
							{errorPay && <Message variant='danger'>{errorPay}</Message>}
							{/* show paypal payment options if user is not admin and order is not paid */}
							{order.paymentMethod === 'PayPal or Credit Card' &&
								!(userInfo && userInfo.isAdmin) &&
								!order.isPaid && (
									<ListGroup.Item>
										{loadingPay && <Loader />}
										{!sdkReady ? (
											<Loader />
										) : (
											<PayPalButton
												amount={order.totalAmount}
												onSuccess={paymentSuccessHandler}
											/>
										)}
									</ListGroup.Item>
								)}
							{loadingDeliver && <Loader />}
							{errorDeliver && (
								<Message variant='danger'>{errorDeliver}</Message>
							)}
							{userInfo &&
								userInfo.isAdmin &&
								order.isPaid &&
								!order.isDelivered && (
									<ListGroup.Item>
										<Button
											type='button'
											className='btn btn-block'
											onClick={deliverHandler}
										>
											Mark as delivered
										</Button>
									</ListGroup.Item>
								)}

							{/* display error or success message */}
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default OrderScreen;
