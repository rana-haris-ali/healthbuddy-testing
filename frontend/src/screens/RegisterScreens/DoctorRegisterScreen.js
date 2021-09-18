import React, { useState, useEffect } from 'react';
import {
	Row,
	Col,
	Form,
	Button,
	Dropdown,
	DropdownButton,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import FormContainer from '../../components/FormContainer';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { registerDoctor } from '../../actions/doctorActions';

const DoctorRegisterScreen = ({ location, history }) => {
	// list of degrees to be rendered for dropdown options
	const degrees = ['MBBS', 'FCPS', 'MRPS', 'BDS'];

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [selectedDegrees, setSelectedDegrees] = useState([]);
	const [message, setMessage] = useState('');

	const dispatch = useDispatch();
	const {
		loading: loadingLogin,
		userInfo,
		error: errorLogin,
	} = useSelector((state) => state.userLogin);

	const { loading: loadingRegister, error: errorRegister } = useSelector(
		(state) => state.registerDoctor
	);

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

		if (name === '' || email === '' || password === '') {
			setMessage('Please fill all fields');
		} else if (password !== confirmPassword) {
			setMessage("Passwords don't match");
		} else {
			dispatch(
				registerDoctor({ name, email, password, degrees: selectedDegrees })
			);
		}
	};

	const handleDropDownClick = (e) => {
		setMessage('');
		if (selectedDegrees.includes(e.target.innerHTML)) {
			setMessage('Degree has already been selected');
		} else {
			setSelectedDegrees([...selectedDegrees, e.target.innerHTML]);
		}
	};

	return (
		<FormContainer>
			<h1 className='text-center'>Doctor Sign Up</h1>

			{/* if error from backend, then show error
			   else if message from frontend, show message */}

			{errorRegister ? (
				<Message variant='danger'>{errorRegister}</Message>
			) : errorLogin ? (
				<Message variant='danger'>{errorLogin}</Message>
			) : message ? (
				<Message variant='danger'>{message}</Message>
			) : null}
			{loadingRegister || loadingLogin ? (
				<Loader />
			) : (
				<>
					<Form onSubmit={formSubmitHandler} className='my-2'>
						<hr />
						<Form.Group>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type='username'
								placeholder='Enter Your Name'
								value={name}
								onChange={(e) => setName(e.target.value)}
							></Form.Control>
						</Form.Group>
						<hr />
						<Form.Group className='my-4'>
							<Form.Label>Email Address</Form.Label>
							<Form.Control
								type='email'
								placeholder='Enter Email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							></Form.Control>
						</Form.Group>
						<hr />
						<Form.Group className='my-4'>
							<Form.Label>Password</Form.Label>
							<Form.Control
								type='password'
								placeholder='Enter Password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							></Form.Control>
						</Form.Group>
						<hr />
						<Form.Group className='my-4'>
							<Form.Label>Confirm Password</Form.Label>
							<Form.Control
								type='password'
								placeholder='Confirm Password'
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Row>
							<Col md={6}>
								<textarea
									className='form-control'
									value={selectedDegrees.join('\n')}
									placeholder='Select degrees from list &#13;Selected degrees will appear here'
									style={{
										width: '100%',
										resize: 'none',
									}}
									rows='3'
									id='degrees'
									readOnly
								></textarea>
							</Col>
							<Col md={6}>
								<DropdownButton
									id='degrees-dropdown'
									title='Select Degrees'
									variant='light'
								>
									{degrees.map((degree) => (
										<Dropdown.Item onClick={handleDropDownClick} key={degree}>
											{degree}
										</Dropdown.Item>
									))}
								</DropdownButton>
							</Col>
						</Row>
						<div className='col text-center'>
							<Button className='btn btn-md mt-4' type='submit' variant='dark'>
								Sign Up
							</Button>
						</div>
					</Form>
					<Row className='py-3'>
						<Col>
							Already Registered?{' '}
							<Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
								Login
							</Link>
						</Col>
					</Row>
					<Row className='py-3'>
						<Col>
							Looking to register as a Patient?{' '}
							<Link
								to={
									redirect
										? `/register-patient?redirect=${redirect}`
										: '/register-patient'
								}
							>
								Register as Patient
							</Link>
						</Col>
					</Row>
				</>
			)}
		</FormContainer>
	);
};

export default DoctorRegisterScreen;
