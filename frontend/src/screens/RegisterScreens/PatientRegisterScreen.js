import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import ReactMapGL, { Marker } from 'react-map-gl';

import FormContainer from '../../components/FormContainer';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { registerPatient } from '../../actions/patientActions';

// list of diseases to be rendered
import diseasesOptions from './diseases';

const PatientRegisterScreen = ({ location, history }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [medicalInfo, setMedicalInfo] = useState('');
	const [selectedDiseases, setSelectedDiseases] = useState([]);
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

	const handleDropDownChange = (e) => {
		// add the selected options to selected diseases state
		setSelectedDiseases(e.map((disease) => disease.value));
	};

	const onMedicalInfoChange = (e) => {
		if (e.target.value.split(' ').length > 100) {
			setMessage('Limit reached');
		} else {
			setMedicalInfo(e.target.value);
		}
	};

	const formSubmitHandler = (event) => {
		event.preventDefault();

		if (name === '' || email === '' || password === '') {
			setMessage('Please fill all fields');
		} else if (password !== confirmPassword) {
			setMessage("Passwords don't match");
		} else {
			dispatch(
				registerPatient({
					// capitalize the name
					name: name[0].toUpperCase() + name.substring(1),
					email,
					password,
					medicalInfo,
					diseases: selectedDiseases,
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
							name='diseases'
							options={diseasesOptions}
							className='basic-multi-select'
							classNamePrefix='select'
							placeholder='Please select your disease(s)'
							onChange={handleDropDownChange}
						/>
						<hr className='mb-4' />
						<Form.Group className='my-4'>
							<Form.Label htmlFor='medicalInfo'>Medical Information</Form.Label>
							<Form.Control
								as='textarea'
								id='medicalInfo'
								placeholder='Please add your medical information (100 words limit)'
								maxLength='500'
								value={medicalInfo}
								onChange={onMedicalInfoChange}
							></Form.Control>
						</Form.Group>
						<hr className='mb-4' />
						<Form.Group className='my-4'>
							<h4 className='mb-3'>
								Please select your location. This location will be used for
								shipping your medicines, getting directions to doctor etc.
							</h4>

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
