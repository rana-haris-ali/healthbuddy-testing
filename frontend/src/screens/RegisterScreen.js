import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { register } from '../actions/pharmacy/userActions';

const RegisterScreen = ({ location, history }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState('');

	const dispatch = useDispatch();
	const userLogin = useSelector((state) => state.userLogin);
	const userRegister = useSelector((state) => state.userRegister);
	const { loading, error, userInfo } = userRegister;
	// save redirect path so that user can be redirected to that path after login
	const redirect = location.search ? location.search.split('=')[1] : '/';

	useEffect(() => {
		// check if user is already logged in
		// if logged in then redirect
		if (userRegister.userInfo || userLogin.userInfo) {
			history.push(redirect);
		}
	}, [userInfo, history, redirect]);

	const formSubmitHandler = (event) => {
		event.preventDefault();

		if (name === '' || email === '' || password === '') {
			setMessage('Please fill all fields');
		} else if (password !== confirmPassword) {
			setMessage("Passwords don't match");
		} else {
			dispatch(register(name, email, password));
		}
	};

	return (
		<FormContainer>
			<h1>Sign Up</h1>

			{/* if error from backend, then show error
			   else if message from frontend, show message */}
			{error ? (
				<Message variant='danger'>{error}</Message>
			) : message ? (
				<Message variant='danger'>{message}</Message>
			) : null}
			{loading ? (
				<Loader />
			) : (
				<>
					<Form onSubmit={formSubmitHandler} className='my-4'>
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
							Sign Up
						</Button>
					</Form>
					<Row className='py-3'>
						<Col>
							Already Registered?{' '}
							<Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
								Login
							</Link>
						</Col>
					</Row>
				</>
			)}
		</FormContainer>
	);
};

export default RegisterScreen;
