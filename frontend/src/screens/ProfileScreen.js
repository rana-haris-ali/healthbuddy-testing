import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Select from 'react-select';

import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
	getUserDetails,
	updateUserDetails,
} from '../actions/pharmacy/userActions';
import diseasesOptions from './RegisterScreens/diseases';
import degreeOptions from './RegisterScreens/degrees';
import { getMedicalInfo, updateMedicalInfo } from '../actions/patientActions';
import {
	getDoctorProfessionalInfo,
	updateDoctorProfessionalInfo,
} from '../actions/doctorActions';

const ProfileScreen = ({ history }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState('');

	const [selectedOptions, setSelectedOptions] = useState(null);

	const dispatch = useDispatch();
	const { userInfo } = useSelector((state) => state.userLogin);

	const isPatient = userInfo?.role === 'Patient';
	const isDoctor = userInfo?.role === 'Doctor';

	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	const { error: errorFromUserUpdate, success } = useSelector(
		(state) => state.userUpdateProfile
	);

	const {
		loading: loadingGetMedicalInfo,
		error: errorGetMedicalInfo,
		medicalInfo,
	} = useSelector((state) => state.getMedicalInfo);

	const {
		loading: loadingUpdateMedicalInfo,
		error: errorUpdateMedicalInfo,
		success: successUpdateMedicalInfo,
	} = useSelector((state) => state.updateMedicalInfo);

	const {
		loading: loadingGetProfessionalInfo,
		error: errorGetProfessionalInfo,
		professionalInfo,
	} = useSelector((state) => state.getProfessionalInfo);

	const {
		loading: loadingUpdateProfessionalInfo,
		error: errorUpdateProfessionalInfo,
		success: successUpdateProfessionalInfo,
	} = useSelector((state) => state.updateProfessionalInfo);

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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user, userInfo, history, dispatch]);

	useEffect(() => {
		if (!userInfo) {
			// if user isn't logged in, redirect to login
			history.push('/login');
		} else if (userInfo.role === 'Patient') {
			dispatch(getMedicalInfo());
		} else if (userInfo.role === 'Doctor') {
			dispatch(getDoctorProfessionalInfo());
		}
	}, [dispatch, history, userInfo]);

	const handleDropDownChange = (e) => {
		// add the selected options to selectedOptions state
		setSelectedOptions(e.map((option) => option.value));
	};

	const profileFormSubmitHandler = (event) => {
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

	const formSubmitHandler = (e) => {
		e.preventDefault();
		if (isPatient) {
			dispatch(
				updateMedicalInfo({
					diseases: selectedOptions || medicalInfo?.diseases,
				})
			);
		} else if (isDoctor) {
			dispatch(
				updateDoctorProfessionalInfo({
					degrees: selectedOptions || professionalInfo?.degrees,
				})
			);
		}
	};

	return (
		<>
			<h1 className='text-center mt-3'>Update Profile</h1>
			<>
				<Tabs>
					<TabList
						style={{
							textAlign: 'center',
						}}
						// className='text-center'
					>
						<Tab>Account</Tab>
						<Tab>
							{isPatient ? 'Medical' : isDoctor ? 'Professional' : null}
						</Tab>
					</TabList>

					<TabPanel>
						<FormContainer>
							{/* if error from backend, then show error
	 									else if message from frontend, show message */}
							{(error || errorFromUserUpdate) && (
								<Message variant='danger'>
									{error || errorFromUserUpdate}
								</Message>
							)}
							{message && <Message variant='danger'>{message}</Message>}
							{success && (
								<Message variant='success'>Profile Update Successfully</Message>
							)}
							{loading ? (
								<Loader />
							) : (
								<Form onSubmit={profileFormSubmitHandler} className='my-2'>
									<Form.Group>
										<Form.Label>Name</Form.Label>
										<Form.Control
											type='username'
											placeholder='Enter Your Name'
											value={name}
											style={{ border: '1px groove', borderRadius: '5px' }}
											onChange={(e) => setName(e.target.value)}
										></Form.Control>
									</Form.Group>
									<hr />
									<Form.Group>
										<Form.Label>Email Address</Form.Label>
										<Form.Control
											type='email'
											placeholder='Enter Email'
											value={email}
											style={{ border: '1px groove', borderRadius: '5px' }}
											onChange={(e) => setEmail(e.target.value)}
										></Form.Control>
									</Form.Group>
									<hr />
									<Form.Group>
										<Form.Label>Password</Form.Label>
										<Form.Control
											type='password'
											placeholder='Enter Password'
											value={password}
											style={{ border: '1px groove', borderRadius: '5px' }}
											onChange={(e) => setPassword(e.target.value)}
										></Form.Control>
									</Form.Group>
									<hr />
									<Form.Group>
										<Form.Label>Confirm Password</Form.Label>
										<Form.Control
											type='password'
											placeholder='Confirm Password'
											value={confirmPassword}
											style={{ border: '1px groove', borderRadius: '5px' }}
											onChange={(e) => setConfirmPassword(e.target.value)}
										></Form.Control>
									</Form.Group>
									<Button type='submit' variant='dark'>
										Update Account Info
									</Button>
								</Form>
							)}
						</FormContainer>
					</TabPanel>
					<TabPanel>
						<FormContainer>
							{(errorGetMedicalInfo ||
								errorUpdateMedicalInfo ||
								errorGetProfessionalInfo ||
								errorUpdateProfessionalInfo) && (
								<Message variant='danger'>
									{errorGetMedicalInfo ||
										errorUpdateMedicalInfo ||
										errorGetProfessionalInfo ||
										errorUpdateProfessionalInfo}
								</Message>
							)}
							{(successUpdateMedicalInfo || successUpdateProfessionalInfo) && (
								<Message variant='success'>Successfully Updated</Message>
							)}
							{/* show loader for all of these loadings */}
							{loadingGetMedicalInfo ||
							loadingUpdateMedicalInfo ||
							loadingGetProfessionalInfo ||
							loadingUpdateProfessionalInfo ? (
								<Loader />
							) : (
								<Form onSubmit={formSubmitHandler}>
									{isPatient ? (
										<>
											<Select
												isMulti
												closeMenuOnSelect={false}
												name='diseases'
												options={diseasesOptions}
												className='basic-multi-select'
												classNamePrefix='select'
												defaultValue={medicalInfo?.diseases.map((disease) => {
													return { label: disease, value: disease };
												})}
												placeholder='Please select your disease(s)'
												onChange={handleDropDownChange}
											/>
											<Button type='submit' variant='dark'>
												Update Medical Info
											</Button>
										</>
									) : isDoctor ? (
										<>
											<Select
												isMulti
												closeMenuOnSelect={false}
												name='diseases'
												options={degreeOptions}
												className='basic-multi-select'
												classNamePrefix='select'
												defaultValue={professionalInfo?.degrees.map(
													(degree) => {
														return { label: degree, value: degree };
													}
												)}
												placeholder='Please select your degree(s)'
												onChange={handleDropDownChange}
											/>
											<Button type='submit' variant='dark'>
												Update Professional Info
											</Button>
										</>
									) : null}
								</Form>
							)}
						</FormContainer>
					</TabPanel>
				</Tabs>
			</>
		</>
	);
};

export default ProfileScreen;
