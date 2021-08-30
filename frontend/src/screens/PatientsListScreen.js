import React, { useEffect } from 'react';
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

	const { loading, pendingPatientRequests, acceptedPatientRequests, error } =
		useSelector((state) => state.patientsList);

	const {
		loading: loadingAccept,
		success: successAccept,
		error: errorAccept,
	} = useSelector((state) => state.acceptPatientRequest);

	useEffect(() => {
		dispatch({ type: PATIENT_REQUEST_ACCEPTANCE_RESET });
	}, [dispatch]);

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
							{pendingPatientRequests.length > 0 ? (
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
											<th>Name</th>
											<th>ID</th>
											<th>Email</th>
											<th></th>
										</tr>
									</thead>
									<tbody>
										{pendingPatientRequests.map((pendingRequest) => {
											return (
												<tr key={pendingRequest._id}>
													<td>{pendingRequest.user.name}</td>
													<td>{pendingRequest.patient}</td>
													<td>
														<a href={`mailto:${pendingRequest.user.email}`}>
															{pendingRequest.user.email}
														</a>
													</td>
													<td>
														<Button
															onClick={() =>
																acceptRequestHandler(pendingRequest._id)
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
							{acceptedPatientRequests.length > 0 ? (
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
											<th>Name</th>
											<th>ID</th>
											<th>Email</th>
											<th></th>
										</tr>
									</thead>
									<tbody>
										{acceptedPatientRequests.map((acceptedRequest) => {
											return (
												<tr key={acceptedRequest._id}>
													<td>{acceptedRequest.user.name}</td>
													<td>{acceptedRequest.patient}</td>
													<td>
														<a href={`mailto:${acceptedRequest.user.email}`}>
															{acceptedRequest.user.email}
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
