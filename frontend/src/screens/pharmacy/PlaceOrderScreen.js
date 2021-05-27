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
import NavigationSteps from '../../components/NavigationSteps';
import { addToCart, removeFromCart } from '../../actions/pharmacy/cartActions';
import { createOrder } from '../../actions/pharmacy/orderActions';

const PlaceOrderScreen = ({ history }) => {
	const dispatch = useDispatch();

	const cart = useSelector((state) => state.cart);
	const { shippingAddress, paymentMethod, cartItems } = cart;

	const { success, error, order } = useSelector((state) => state.orderCreate);

	// calculate prices
	cart.netAmount = cartItems.reduce(
		(acc, currItem) => acc + currItem.price * currItem.qty,
		0
	);

	cart.shippingAmount = cart.netAmount > 1000 ? 100 : 200;
	cart.taxAmount = 0.05 * cart.netAmount;
	cart.totalAmount = cart.netAmount + cart.shippingAmount + cart.taxAmount;

	useEffect(() => {
		if (success) {
			history.push(`/orders/${order._id}`);
		}
	}, [history, success]);

	const placeOrderHandler = () => {
		dispatch(
			createOrder({
				orderItems: cartItems,
				shippingAddress,
				paymentMethod,
				netAmount: cart.netAmount,
				shippingAmount: cart.shippingAmount,
				taxAmount: cart.taxAmount,
				totalAmount: cart.totalAmount,
			})
		);
	};

	return (
		<>
			<NavigationSteps
				steps={[
					{ name: 'Login', link: '/login' },
					{ name: 'Shipping', link: '/shipping' },
					{ name: 'Payment', link: '/payment' },
					{ name: 'Place Order', link: '/placeorder' },
				]}
				disabledSteps={[]}
				currentStep='Place Order'
			/>
			<Row>
				<Col md={8}>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>Shipping</h2>
							<p>
								<strong>Address: </strong>
								{shippingAddress.address}, {shippingAddress.city},{' '}
								{shippingAddress.country}
							</p>
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Payment Method</h2>
							<p>
								<strong>Method: </strong>
								{paymentMethod}
							</p>
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Order Items</h2>
							{cartItems.length === 0 ? (
								<Message>Your cart is empty</Message>
							) : (
								<ListGroup variant='flush'>
									{cartItems.map((item, index) => (
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
												<Col md={2}>
													<Form.Control
														as='select'
														value={item.qty}
														onChange={(e) =>
															dispatch(
																addToCart(
																	item.productId,
																	Number(e.target.value)
																)
															)
														}
													>
														{/* render dropdown list of available quantity options */}
														{[...Array(item.countInStock).keys()].map(
															(option) => (
																<option key={option + 1} value={option + 1}>
																	{option + 1}
																</option>
															)
														)}
													</Form.Control>
												</Col>
												<Col md={1}>
													<Button
														type='button'
														variant='light'
														onClick={() =>
															dispatch(removeFromCart(item.productId))
														}
													>
														<i className='fas fa-trash'></i>
													</Button>
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
									<Col>Rs. {cart.netAmount}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Shipping Amount:</Col>
									<Col>Rs. {cart.shippingAmount}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Tax Amount:</Col>
									<Col>Rs. {cart.taxAmount}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<strong>
									<Row>
										<Col>Total Amount:</Col>
										<Col>Rs. {cart.totalAmount}</Col>
									</Row>
								</strong>
							</ListGroup.Item>

							{/* display error or success message */}
							{error && (
								<ListGroup.Item>
									<Message variant='danger'>{error}</Message>
								</ListGroup.Item>
							)}
							<ListGroup.Item>
								<Button
									type='button'
									className='btn-block'
									disabled={cartItems.length === 0}
									onClick={placeOrderHandler}
								>
									Place Order
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default PlaceOrderScreen;
