import React, { useState, useEffect } from 'react';
import { Table, Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../components/Loader';
import Message from '../components/Message';
import {
	getPatientsList,
	acceptPatientRequest,
} from '../actions/doctorActions';
import { PATIENT_REQUEST_ACCEPTANCE_RESET } from '../constants/doctorConstants';

const PatientsListScreen = ({ history }) => {
	const dispatch = useDispatch();

	const { userInfo } = useSelector((state) => state.userLogin);

	const { loading, patientRequests, acceptedPatients, error } = useSelector(
		(state) => state.patientsList
	);

	const {
		loading: loadingAccept,
		success: successAccept,
		error: errorAccept,
	} = useSelector((state) => state.acceptPatientRequest);

	useEffect(() => {
		dispatch({ type: PATIENT_REQUEST_ACCEPTANCE_RESET });
	}, []);

	useEffect(() => {
		if (!userInfo || userInfo.role !== 'Doctor') {
			history.push('/login');
		} else {
			dispatch(getPatientsList());
		}
	}, [dispatch, history, userInfo, successAccept]);

	const acceptRequestHandler = (patientId) => {
		dispatch(acceptPatientRequest(patientId));
	};

	return (
		<>
			{error && <Message variant='danger'>{error}</Message>}
			<>
				<h1 className='text-center'>PATIENTS</h1>
				{loading || loadingAccept ? (
					<Loader />
				) : (
					<Row>
						<Col md={6}>
							<h3 className='text-center my-3'>Requests</h3>
							{successAccept ? (
								<Message variant='success'>
									Patient request has been accepted
								</Message>
							) : errorAccept ? (
								<Message variant='danger'>{errorAccept}</Message>
							) : null}
							{patientRequests.length > 0 ? (
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
											<th>Name</th>
											<th>ID</th>
											<th>Email</th>
											<th></th>
										</tr>
									</thead>
									<tbody>
										{patientRequests.map((patientRequest) => {
											return (
												<tr key={patientRequest._id}>
													<td>{patientRequest.user.name}</td>
													<td>{patientRequest.patient}</td>
													<td>
														<a href={`mailto:${patientRequest.user.email}`}>
															{patientRequest.user.email}
														</a>
													</td>
													<td>
														<Button
															onClick={() =>
																acceptRequestHandler(patientRequest._id)
															}
														>
															Accept
														</Button>
													</td>
												</tr>
											);
										})}
									</tbody>
								</Table>
							) : (
								<Message>There are no new patient requests right now</Message>
							)}
						</Col>
						<Col md={6}>
							<h3 className='text-center  my-3'>Approved</h3>
							{acceptedPatients.length > 0 ? (
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
											<th>Name</th>
											<th>ID</th>
											<th>Email</th>
											<th></th>
										</tr>
									</thead>
									<tbody>
										{acceptedPatients.map((acceptedPatient) => {
											return (
												<tr key={acceptedPatient._id}>
													<td>{acceptedPatient.user.name}</td>
													<td>{acceptedPatient.patient}</td>
													<td>
														<a href={`mailto:${acceptedPatient.user.email}`}>
															{acceptedPatient.user.email}
														</a>
													</td>
												</tr>
											);
										})}
									</tbody>
								</Table>
							) : (
								<Message>There are no active patients to show</Message>
							)}
						</Col>
					</Row>
				)}
			</>
		</>
	);
};

export default PatientsListScreen;
