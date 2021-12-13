import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';

import FormContainer from '../../components/FormContainer';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { registerPatient } from '../../actions/patientActions';

// list of symptoms to be rendered
import topSymptomsOptions from './topSymptoms';
import otherSymptomsOptions from './otherSymptoms';
import { diseasePrediction } from '../../actions/predictionActions';

const DiseasePredictionScreen = ({ location, history }) => {
	const [selectedTopSymptoms, setSelectedTopSymptoms] = useState([]);
	const [selectedOtherSymptoms, setSelectedOtherSymptoms] = useState([]);
	const [validationError, setValidationError] = useState('');

	const dispatch = useDispatch();
	const {
		loading: loadingLogin,
		userInfo,
		error: errorLogin,
	} = useSelector((state) => state.userLogin);

	const {
		loading: loadingPrediction,
		success,
		result,
		error: errorPrediction,
	} = useSelector((state) => state.diseasePrediction);

	const handleTopSymptomsChange = (e) => {
		// add the selected options to selected TopSymptoms state
		setSelectedTopSymptoms(e.map((symptom) => symptom.value));
	};

	const handleOtherSymptomsChange = (e) => {
		// add the selected options to selected OtherSymptoms state
		setSelectedOtherSymptoms(e.map((symptom) => symptom.value));
	};

	const formSubmitHandler = (event) => {
		event.preventDefault();
		if (
			selectedTopSymptoms.length === 0 &&
			selectedOtherSymptoms.length === 0
		) {
			// if no symptom selected show error
			setValidationError('Please select at least 1 symptom for prediction.');
		} else {
			dispatch(
				diseasePrediction([...selectedTopSymptoms, ...selectedOtherSymptoms])
			);
			setValidationError('');
		}
	};

	return (
		<FormContainer>
			<h1 className='text-center'>Disease Prediction through Symptoms</h1>

			<>
				{validationError && (
					<Message variant='danger'>{validationError}</Message>
				)}
				{errorPrediction && (
					<Message variant='danger'>{errorPrediction}</Message>
				)}

				<Form onSubmit={formSubmitHandler} className='my-2'>
					<hr className='mb-5' />
					<h5
						style={{
							color: 'rgb(213 117 117)',
							fontSize: 'larger',
						}}
					>
						This tool lets you intelligently predict your medical condition
						based on the symptoms. This tool does not require the assistance of
						a doctor for prediction. However, you can feel free to{' '}
						<Link to='doctors' style={{ color: '#965050' }}>
							contact a doctor
						</Link>{' '}
						at any time.
					</h5>
					<hr />
					<h2 className='mt-4'>Top Symptoms</h2>
					<h5 className='mt-2 mb-4'>
						This list contains the most commonly occuring symptoms.
					</h5>
					<Select
						isMulti
						closeMenuOnSelect={false}
						name='topSymptoms'
						options={topSymptomsOptions}
						className='basic-multi-select'
						classNamePrefix='select'
						placeholder='Please select your symptom(s)'
						onChange={handleTopSymptomsChange}
					/>
					<h2 className='mt-5'>Other Symptoms</h2>
					<h5 className='mt-2 mb-4'>
						This list contains the less common symptoms (which are not present
						in above list).
					</h5>
					<Select
						isMulti
						closeMenuOnSelect={false}
						name='otherSymptoms'
						options={otherSymptomsOptions}
						className='basic-multi-select'
						classNamePrefix='select'
						placeholder='Please select your symptom(s)'
						onChange={handleOtherSymptomsChange}
					/>
					<Button className='btn btn-md mt-5 mb-3' type='submit' variant='dark'>
						Predict
					</Button>
					{/* {loadingPrediction ? (
						<Loader />
					) : (
						<h3 className='mt-5'>
							Prediction: <span style={{ fontWeight: '900' }}>{result}</span>
						</h3>
					)} */}
					{loadingPrediction && <Loader />}
					{success && (
						<>
							<h1
								className='mt-5 text-center'
								style={{ color: 'rgb(98 98 98)' }}
							>
								Prediction:{' '}
								<span style={{ color: 'black', fontWeight: '900' }}>
									{result}
								</span>
							</h1>
							<h4 className='text-center mt-4'>
								Want to contact a doctor? <Link to='doctors'>Click here</Link>
							</h4>
						</>
					)}
				</Form>
			</>

			{/* if error from backend, then show error
			   else if message from frontend, show message */}

			{/* {errorRegister ? (
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
			)} */}
		</FormContainer>
	);
};

export default DiseasePredictionScreen;
