import React, { useState, useEffect } from 'react';
import { Table, Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../components/Loader';
import Message from '../components/Message';
import { patientGetAllRequests } from '../actions/patientActions';
import { PATIENT_GET_ALL_REQUESTS_RESET } from '../constants/patientConstants';

const PatientAllRequestsScreen = ({ history }) => {
	const dispatch = useDispatch();

	const { userInfo } = useSelector((state) => state.userLogin);

	const { loading, requests, error } = useSelector(
		(state) => state.patientAllRequests
	);

	useEffect(() => {
		dispatch({ type: PATIENT_GET_ALL_REQUESTS_RESET });
	}, []);

	useEffect(() => {
		if (!userInfo || userInfo.role !== 'Patient') {
			history.push('/login');
		} else {
			dispatch(patientGetAllRequests());
		}
	}, [dispatch, history, userInfo]);

	return (
		<>
			<h1 className='my-3'>Requests</h1>

			{error && <Message variant='danger'>{error}</Message>}

			{loading ? (
				<Loader />
			) : requests.length > 0 ? (
				<Table
					striped
					bordered
					hover
					responsive
					className='table-sm'
					style={{ textAlign: 'center' }}
				>
					<thead>
						<tr>
							<th>Doctor Name</th>
							<th>ID</th>
							<th>Email</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{requests.map((request) => {
							return (
								<tr key={request._id}>
									<td>Dr. {request.doctor.user.name}</td>
									<td>{request.doctor._id}</td>
									<td>
										<a href={`mailto:${request.doctor.user.email}`}>
											{request.doctor.user.email}
										</a>
									</td>
									<td>
										{request.status === 'Accepted' ? (
											<i className='fas fa-check' style={{ color: 'green' }}>
												{' '}
												Accepted
											</i>
										) : request.status === 'Pending' ? (
											<i class='fas fa-clock' style={{ color: 'orange' }}>
												{' '}
												Pending
											</i>
										) : (
											<i className='fas fa-times' style={{ color: 'red' }}>
												{' '}
												Rejected
											</i>
										)}
									</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			) : (
				<Message>You don't have any requests yet</Message>
			)}
		</>
	);
};

export default PatientAllRequestsScreen;
