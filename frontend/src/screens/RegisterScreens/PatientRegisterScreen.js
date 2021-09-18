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
import { registerPatient } from '../../actions/patientActions';

const PatientRegisterScreen = ({ location, history }) => {
	// list of diseases to be rendered for dropdown options
	const diseases = [
		'Cancer',
		'Covid-19',
		'Diabetes',
		'Arthiritis',
		'Blindness',
		'Deafness',
	];

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [selectedDiseases, setSelectedDiseases] = useState([]);
	const [message, setMessage] = useState('');

	const dispatch = useDispatch();
	const {
		loading: loadingLogin,
		userInfo,
		error: errorLogin,
	} = useSelector((state) => state.userLogin);

	const { loading: loadingRegister, error: errorRegister } = useSelector(
		(state) => state.registerPatient
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
				registerPatient({
					name,
					email,
					password,
					diseases: selectedDiseases,
				})
			);
		}
	};

	const handleDropDownClick = (e) => {
		setMessage('');
		if (selectedDiseases.includes(e.target.innerHTML)) {
			setMessage('Disease has already been selected');
		} else {
			setSelectedDiseases([...selectedDiseases, e.target.innerHTML]);
		}
	};

	return (
		<FormContainer>
			<h1 className='text-center'>Patient Sign Up</h1>

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
									value={selectedDiseases.join('\n')}
									placeholder='Select diseases from list &#13;Selected diseases will appear here'
									style={{
										width: '100%',
										resize: 'none',
									}}
									rows='3'
									id='diseases'
									readOnly
								></textarea>
							</Col>
							<Col md={6}>
								<DropdownButton
									id='diseases-dropdown'
									title='Select Diseases'
									variant='light'
								>
									{diseases.map((disease) => (
										<Dropdown.Item onClick={handleDropDownClick} key={disease}>
											{disease}
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
							Looking to register as a Doctor?{' '}
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

export default PatientRegisterScreen;
