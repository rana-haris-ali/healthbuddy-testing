import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import ReactMapGL, { Marker } from 'react-map-gl';

import FormContainer from '../../components/FormContainer';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { registerDoctor } from '../../actions/doctorActions';

// list of diseases to be rendered
import degreesOptions from './degrees';
import specializationOptions from './specializations';

const DoctorRegisterScreen = ({ location, history }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [description, setDescription] = useState('');
	const [selectedDegrees, setSelectedDegrees] = useState([]);
	const [selectedSpecializations, setSelectedSpecializations] = useState([]);
	const [message, setMessage] = useState('');
	const [viewport, setViewport] = useState({
		width: '100%',
		height: 500,
		latitude: 30.3753,
		longitude: 69.3451,
		zoom: 5,
	});

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

	const handleDegreesChange = (e) => {
		if (e.length > 3) {
			alert('Maximum 3 degrees are allowed');
		} else {
			// add the selected options to selected degrees state
			setSelectedDegrees(e.map((degree) => degree.value));
		}
	};

	const handleSpecializationChange = (e) => {
		if (e.length > 3) {
			alert('Maximum 3 specializations are allowed');
		} else {
			// add the selected options to selected specializations state
			setSelectedSpecializations(
				e.map((specialization) => specialization.value)
			);
		}
	};

	const onDescriptionChange = (e) => {
		if (e.target.value.split(' ').length > 100) {
			setMessage('Limit reached');
		} else {
			setDescription(e.target.value);
		}
	};

	const formSubmitHandler = (event) => {
		event.preventDefault();

		if (name === '' || email === '' || password === '' || description === '') {
			setMessage('Please fill all fields');
			alert('Please fill all fields');
		} else if (password !== confirmPassword) {
			setMessage("Passwords don't match");
			alert("Passwords don't match");
		} else if (
			selectedSpecializations.length === 0 ||
			selectedDegrees.length === 0
		) {
			setMessage('Please select your degrees and specializations');
			alert('Please select your degrees and specializations');
		} else {
			dispatch(
				registerDoctor({
					// capitalize the name
					name: name[0].toUpperCase() + name.substring(1),
					email,
					password,
					degrees: selectedDegrees,
					description,
					specializations: selectedSpecializations,
					coordinates: {
						latitude: viewport.latitude,
						longitude: viewport.longitude,
					},
				})
			);
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
							<Form.Label htmlFor='name'>Name</Form.Label>
							<Form.Control
								type='username'
								id='name'
								placeholder='Enter Your Name'
								value={name}
								onChange={(e) => setName(e.target.value)}
							></Form.Control>
						</Form.Group>
						<hr />
						<Form.Group className='my-4'>
							<Form.Label htmlFor='email'>Email Address</Form.Label>
							<Form.Control
								type='email'
								id='email'
								placeholder='Enter Email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							></Form.Control>
						</Form.Group>
						<hr />
						<Form.Group className='my-4'>
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
						<Form.Group className='my-4'>
							<Form.Label htmlFor='confirmPassword'>
								Confirm Password
							</Form.Label>
							<Form.Control
								type='password'
								id='confirmPassword'
								placeholder='Confirm Password'
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
							></Form.Control>
						</Form.Group>
						<hr className='mb-4' />
						<Select
							isMulti
							closeMenuOnSelect={false}
							name='degrees'
							options={degreesOptions}
							className='basic-multi-select'
							classNamePrefix='select'
							placeholder='Please select your degree(s) (Max 3 allowed)'
							value={selectedDegrees.map((degree) => {
								return { value: degree, label: degree };
							})}
							onChange={handleDegreesChange}
						/>
						<hr className='mb-4' />
						<Form.Group className='my-4'>
							<Form.Label htmlFor='description'>Description</Form.Label>
							<Form.Control
								as='textarea'
								id='description'
								placeholder='Please add a short description (100 words limit)'
								maxLength='500'
								value={description}
								onChange={onDescriptionChange}
							></Form.Control>
						</Form.Group>
						<hr className='mb-4' />
						<Select
							isMulti
							closeMenuOnSelect={false}
							name='specialization'
							options={specializationOptions}
							className='basic-multi-select'
							classNamePrefix='select'
							placeholder='Please select your specialization (Max 3 allowed)'
							value={selectedSpecializations.map((specialization) => {
								return { value: specialization, label: specialization };
							})}
							onChange={handleSpecializationChange}
						/>
						<hr className='mb-4' />
						<Form.Group className='my-4'>
							<Form.Label htmlFor='location'>Select Clinic Location</Form.Label>

							<ReactMapGL
								{...viewport}
								onViewportChange={(viewport) => setViewport(viewport)}
								mapboxApiAccessToken={
									'pk.eyJ1IjoicmFuYS1oYXJpcy1hbGkiLCJhIjoiY2t1NXd3NGszMW54dTJwcWhnc3BrOXp2cSJ9.DH5z_oGb8q_B4EhgqLr1Ug'
								}
								mapStyle='mapbox://styles/rana-haris-ali/cku6vluo33yq917nxmcr7r6j2'
							>
								<Marker
									latitude={viewport.latitude}
									longitude={viewport.longitude}
								>
									<i
										class='fas fa-map-marker-alt'
										style={{ fontWeight: '900', fontSize: '30px' }}
									></i>
								</Marker>
							</ReactMapGL>
						</Form.Group>
						<Button
							className='btn btn-md mt-5 mb-3'
							type='submit'
							variant='dark'
						>
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
