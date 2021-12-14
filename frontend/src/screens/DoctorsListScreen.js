import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Rating from '../components/pharmacy/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getDoctorsList } from '../actions/doctorActions';
import { requestDoctorContact } from '../actions/patientActions';
import { REQUEST_DOCTOR_CONTACT_RESET } from '../constants/patientConstants';

const DoctorsListScreen = ({ history }) => {
	const [showLoginPrompt, setsSowLoginPrompt] = useState(false);

	const dispatch = useDispatch();

	const { userInfo } = useSelector((state) => state.userLogin);

	const { loading, doctors, error } = useSelector((state) => state.doctorsList);

	const {
		loading: loadingContactRequest,
		success: successContactRequest,
		error: errorContactRequest,
	} = useSelector((state) => state.requestDoctorContact);

	useEffect(() => {
		dispatch({ type: REQUEST_DOCTOR_CONTACT_RESET });
	}, [dispatch, userInfo]);

	useEffect(() => {
		dispatch(getDoctorsList());
	}, [dispatch]);

	const requestContactHandler = (doctorId) => {
		if (userInfo) {
			dispatch(requestDoctorContact(doctorId));
		} else {
			setsSowLoginPrompt(true);
		}
	};

	return (
		<>
			<h1 className='text-center mb-3'>DOCTORS</h1>
			{loading || loadingContactRequest ? (
				<Loader />
			) : doctors.length > 0 && doctors.some((doctor) => doctor.isVerified) ? (
				<>
					{showLoginPrompt && (
						<Message>
							Only registered users can contact doctors. Either{' '}
							<Link to='/register-patient?redirect=doctors'>Register</Link> a
							new account or <Link to='/login?redirect=doctors'>Login</Link> if
							you already have one
						</Message>
					)}{' '}
					{error && <Message variant='danger'>{error}</Message>}
					{successContactRequest ? (
						<Message variant='success'>
							Your request has been sent successfully.
						</Message>
					) : errorContactRequest ? (
						<Message variant='danger'>{errorContactRequest}</Message>
					) : null}
					<Table
						striped
						bordered
						hover
						responsive
						className='table-sm'
						style={{ textAlign: 'center', fontSize: 'medium' }}
					>
						<thead>
							<tr>
								<th>Doctor Name</th>
								<th>Rating</th>
								<th>Email</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{doctors.map((doctor) => {
								if (doctor.isVerified) {
									return (
										<tr key={doctor._id}>
											<td>Dr. {doctor.user.name}</td>
											<td>
												<Rating
													value={doctor.rating}
													text={`${doctor.numReviews} reviews`}
												/>
											</td>
											<td>
												<a href={`mailto:${doctor.user.email}`}>
													{doctor.user.email}
												</a>
											</td>
											<td>
												{/* prevent doctors from contacting other doctors */}
												{userInfo && userInfo.role === 'Doctor' ? null : (
													<Button
														className='mx-1'
														onClick={() => requestContactHandler(doctor._id)}
													>
														<i className='fas fa-phone-alt'></i> Contact
													</Button>
												)}
												<Button
													onClick={() => history.push(`/doctors/${doctor._id}`)}
												>
													<i className='fas fa-info-circle'></i> Details
												</Button>
											</td>
										</tr>
									);
								}
							})}
						</tbody>
					</Table>
				</>
			) : (
				<Message>There are no doctors right now</Message>
			)}
		</>
	);
};

export default DoctorsListScreen;
