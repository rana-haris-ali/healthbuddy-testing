import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Message from '../components/Message';
import Loader from '../components/Loader';
import {
	getUserDetails,
	updateUserDetails,
} from '../actions/pharmacy/userActions';
// import { register } from '../actions/pharmacy/userActions';

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

	useEffect(() => {
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
			<Col md={9}></Col>
		</Row>
	);
};

export default ProfileScreen;
