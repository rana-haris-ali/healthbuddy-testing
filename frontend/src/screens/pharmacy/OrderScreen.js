import React, { useEffect } from 'react';
import {
	Row,
	Col,
	Form,
	ListGroup,
	Image,
	Button,
	Card,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { getSingleOrder } from '../../actions/pharmacy/orderActions';

const OrderScreen = ({ match }) => {
	const dispatch = useDispatch();

	const { order, loading, error } = useSelector((state) => state.orderDetails);

	useEffect(() => {
		if (!order) {
			dispatch(getSingleOrder(match.params.id));
		}
	}, [dispatch, match.params.id]);

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
									Delivered on {order.deliveredAt}
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
								<Message variant='success'>Paid on {order.paidAt}</Message>
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

							{/* display error or success message */}
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default OrderScreen;
