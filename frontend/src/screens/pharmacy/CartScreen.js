import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Row,
	Col,
	ListGroup,
	Card,
	Form,
	Image,
	Button,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import '../../styles/index.css';
import Message from '../../components/Message';
import { addToCart, removeFromCart } from '../../actions/pharmacy/cartActions';

const CartScreen = ({ match, location, history }) => {
	const dispatch = useDispatch();
	const { cartItems } = useSelector((state) => state.cart);
	const productId = match.params.id;
	const qty = location.search ? Number(location.search.split('=')[1]) : 1;
	useEffect(() => {
		if (productId) {
			dispatch(addToCart(productId, qty));
		}
	}, [dispatch, productId, qty]);

	const removeFromCartHandler = (productId) => {
		dispatch(removeFromCart(productId));
	};

	const checkoutHandler = () => {
		history.push('/login?redirect=shipping');
	};

	const renderList = () => {
		return cartItems.map((cartItem) => (
			<ListGroup.Item key={cartItem.productId}>
				<Row>
					<Col md={2}>
						<Image
							className='cart-screen-image'
							src={cartItem.image}
							alt={cartItem.name}
							fluid
						/>
					</Col>
					<Col md={4}>
						<Link to={`/products/${cartItem.productId}`}>{cartItem.name}</Link>
					</Col>
					<Col md={2}>Rs. {cartItem.price}</Col>

					<Col md={2}>
						<Form.Control
							as='select'
							value={cartItem.qty}
							onChange={(e) =>
								dispatch(addToCart(cartItem.productId, Number(e.target.value)))
							}
						>
							{/* render dropdown list of available quantity options */}
							{[...Array(cartItem.countInStock).keys()].map((option) => (
								<option key={option + 1} value={option + 1}>
									{option + 1}
								</option>
							))}
						</Form.Control>
					</Col>
					<Col md={1}>
						<Button
							type='button'
							variant='light'
							onClick={() => removeFromCartHandler(cartItem.productId)}
						>
							<i className='fas fa-trash'></i>
						</Button>
					</Col>
				</Row>
			</ListGroup.Item>
		));
	};

	return (
		<Row>
			<Col md={8}>
				<h1>Shopping Cart</h1>
				{cartItems.length === 0 ? (
					<Message variant='dark'>Your cart is empty</Message>
				) : (
					<ListGroup variant='flush'>{renderList()}</ListGroup>
				)}
			</Col>
			<Col md={4}>
				<Card>
					<ListGroup>
						<ListGroup.Item>
							<h2>
								SUBTOTAL (
								{cartItems.reduce((acc, cartItem) => acc + cartItem.qty, 0)})
								ITEMS
							</h2>
							<h4>
								<strong>
									Rs.{' '}
									{cartItems.reduce(
										(acc, cartItem) => acc + cartItem.price * cartItem.qty,
										0
									)}
								</strong>
							</h4>
						</ListGroup.Item>
						<ListGroup.Item>
							<Button
								type='button'
								className='btn-block'
								variant='dark'
								disabled={cartItems.length === 0}
								onClick={() => checkoutHandler()}
							>
								Proceed to Checkout
							</Button>
						</ListGroup.Item>
					</ListGroup>
				</Card>
			</Col>
		</Row>
	);
};

export default CartScreen;
