import React, { useState, useEffect } from 'react';
import { Table, Row, Col, Form, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Message from '../components/Message';
import Loader from '../components/Loader';
import {
	getUserDetails,
	updateUserDetails,
} from '../actions/pharmacy/userActions';
import { getMyOrdersList } from '../actions/pharmacy/orderActions';

const ProfileScreen = ({ location, history }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState('');

	const dispatch = useDispatch();
	const { userInfo } = useSelector((state) => state.userLogin);

	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	const { error: errorFromUserUpdate, success } = useSelector(
		(state) => state.userUpdateProfile
	);

	const {
		loading: loadingOrders,
		orders,
		error: errorOrders,
	} = useSelector((state) => state.myOrdersList);

	useEffect(() => {
		if (orders && orders.length === 0) {
			// fetch orders on page load when orders array is empty
			dispatch(getMyOrdersList());
		}
		if (!userInfo) {
			// if user isn't logged in, redirect to login
			history.push('/login');
		} else {
			// if user details havent been fetched yet, then fetch
			if (!user.name) {
				dispatch(getUserDetails('profile'));
			} else {
				setName(user.name);
				setEmail(user.email);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user, userInfo, history, dispatch]);

	const formSubmitHandler = (event) => {
		event.preventDefault();
		if (name === '' && email === '' && password === '') {
			setMessage("Can't Submit Empty Form, Please Make The Changes");
		} else if (password !== '' && password !== confirmPassword) {
			setMessage("Passwords don't match");
		} else {
			// empty the message if previously filled with error
			setMessage('');
			dispatch(updateUserDetails({ name, email, password }));
		}
	};

	return (
		<Row>
			<Col md={3}>
				<h1>Update Profile</h1>

				{/* if error from backend, then show error
	 else if message from frontend, show message */}
				{error || errorFromUserUpdate ? (
					<Message variant='danger'>{error || errorFromUserUpdate}</Message>
				) : message ? (
					<Message variant='danger'>{message}</Message>
				) : null}
				{success ? (
					<Message variant='success'>Profile Update Successfully</Message>
				) : null}
				{loading ? (
					<Loader />
				) : (
					<Form onSubmit={formSubmitHandler} className='my-2'>
						<Form.Group>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type='username'
								placeholder='Enter Your Name'
								value={name}
								onChange={(e) => setName(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group>
							<Form.Label>Email Address</Form.Label>
							<Form.Control
								type='email'
								placeholder='Enter Email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group>
							<Form.Label>Password</Form.Label>
							<Form.Control
								type='password'
								placeholder='Enter Password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group>
							<Form.Label>Confirm Password</Form.Label>
							<Form.Control
								type='password'
								placeholder='Confirm Password'
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Button type='submit' variant='dark'>
							Update
						</Button>
					</Form>
				)}
			</Col>
			<Col md={9}>
				<h1>Orders</h1>
				{loadingOrders ? (
					<Loader />
				) : errorOrders ? (
					<Message variant='danger'>{errorOrders}</Message>
				) : (
					<Table striped bordered hover responsive className='table-sm'>
						<thead>
							<tr>
								<th>ID</th>
								<th>Date</th>
								<th>Total</th>
								<th>Paid</th>
								<th>Delivered</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{orders.map((order) => {
								return (
									<tr key={order._id}>
										<td>{order._id}</td>
										<td>{order.createdAt.substring(0, 10)}</td>
										<td>Rs. {order.totalAmount}</td>
										<td>
											{order.isPaid ? (
												order.paidOn.substring(0, 10)
											) : (
												<i
													className='fas fa-times'
													style={{ color: 'red' }}
												></i>
											)}
										</td>
										<td>
											{order.isDelivered ? (
												order.deliveredOn.substring(0, 10)
											) : (
												<i
													className='fas fa-times'
													style={{ color: 'red' }}
												></i>
											)}
										</td>
										<td>
											<LinkContainer to={`/order/${order._id}`}>
												<Button className='btn-sm' variant='light'>
													Details
												</Button>
											</LinkContainer>
										</td>
									</tr>
								);
							})}
						</tbody>
					</Table>
				)}
			</Col>
		</Row>
	);
};

export default ProfileScreen;
