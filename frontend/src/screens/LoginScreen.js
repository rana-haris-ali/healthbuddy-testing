import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { login } from '../actions/pharmacy/userActions';

const LoginScreen = ({ location, history }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useDispatch();
	const userLogin = useSelector((state) => state.userLogin);
	const { loading, error, userInfo } = userLogin;

	// save redirect path so that user can be redirected to that path after login
	const redirect = location.search ? location.search.split('=')[1] : '/';

	useEffect(() => {
		// check if user is already logged in
		// if logged in then redirect
		if (userInfo) {
			history.push(redirect);
		}
	}, [userInfo, history, redirect]);

	const formSubmitHandler = (event) => {
		event.preventDefault();
		dispatch(login(email, password));
	};

	return (
		<FormContainer>
			<h1 className='text-center'>Sign In</h1>
			{error && <Message variant='danger'>{error}</Message>}
			{loading ? (
				<Loader />
			) : (
				<>
					<hr />
					<Form onSubmit={formSubmitHandler} className='my-4'>
						<Form.Group>
							<Form.Label htmlFor='email'>Email Address</Form.Label>
							<Form.Control
								type='email'
								id='email'
								placeholder='Enter Email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group className='mt-5'>
							<Form.Label htmlFor='password'>Password</Form.Label>
							<Form.Control
								type='password'
								id='password'
								placeholder='Enter Password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							></Form.Control>
						</Form.Group>
						<hr />
						<Button type='submit' variant='dark' className='mt-4'>
							Login
						</Button>
					</Form>
					<Row className='py-3'>
						<Col>
							Are you a new User?{' '}
							<Link
								to={
									redirect
										? `/register-patient?redirect=${redirect}`
										: '/register-patient'
								}
							>
								Register as Patient
							</Link>{' '}
							or{' '}
							<Link
								to={
									redirect
										? `/register-doctor?redirect=${redirect}`
										: '/register-doctor'
								}
							>
								Register as Doctor
							</Link>
						</Col>
					</Row>
				</>
			)}
		</FormContainer>
	);
};

export default LoginScreen;
