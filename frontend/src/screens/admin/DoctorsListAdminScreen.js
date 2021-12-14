import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Rating from '../../components/pharmacy/Rating';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import {
	getDoctorsList,
	toggleDoctorVerification,
} from '../../actions/doctorActions';
import { DOCTOR_TOGGLE_VERIFICATION_RESET } from '../../constants/doctorConstants';

const DoctorsListAdminScreen = ({ history }) => {
	const dispatch = useDispatch();

	const { userInfo } = useSelector((state) => state.userLogin);

	const { loading, doctors, error } = useSelector((state) => state.doctorsList);

	const {
		loading: loadingToggle,
		success: successToggle,
		message: messageToggle,
		error: errorToggle,
	} = useSelector((state) => state.doctorToggleVerification);

	useEffect(() => {
		// redirect to login page if not admin
		if (!userInfo?.isAdmin) {
			history.push('/login');
		}
	}, [userInfo]);

	useEffect(() => {
		dispatch({ type: DOCTOR_TOGGLE_VERIFICATION_RESET });
	}, []);

	useEffect(() => {
		dispatch(getDoctorsList());
	}, [dispatch, messageToggle]);

	const onVerificationToggle = (doctorId) => {
		dispatch(toggleDoctorVerification(doctorId));
	};

	return (
		<>
			<h1 className='text-center mb-3'>DOCTORS</h1>
			{error || errorToggle ? (
				<Message variant='danger'>{error || errorToggle}</Message>
			) : null}
			{successToggle && <Message variant='success'>{messageToggle}</Message>}
			{loading || loadingToggle ? (
				<Loader />
			) : doctors.length > 0 ? (
				<>
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
								<th>Verified</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{doctors.map((doctor) => {
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
											{doctor.isVerified ? (
												<i
													className='fas fa-check'
													style={{ color: 'green' }}
												></i>
											) : (
												<i
													className='fas fa-times'
													style={{ color: 'red' }}
												></i>
											)}
										</td>
										<td>
											<Button
												onClick={() => history.push(`/doctors/${doctor._id}`)}
											>
												<i className='fas fa-info-circle'></i> Details
											</Button>
											<Button
												onClick={() => onVerificationToggle(doctor._id)}
												className='mx-1 text-capitalize'
												style={{ fontWeight: '700' }}
											>
												{doctor.isVerified ? 'UnVerify' : 'Verify'}
											</Button>
										</td>
									</tr>
								);
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

export default DoctorsListAdminScreen;
