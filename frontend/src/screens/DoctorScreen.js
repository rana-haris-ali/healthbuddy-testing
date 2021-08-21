import React, { useState, useEffect } from 'react';
// import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../components/Loader';
import Message from '../components/Message';

import { getSingleDoctor } from '../actions/doctorActions';

const DoctorScreen = ({ match }) => {
	const doctorId = match.params.id;

	const dispatch = useDispatch();

	const { loading, error, doctorDetails } = useSelector(
		(state) => state.doctorDetails
	);

	useEffect(() => {
		dispatch(getSingleDoctor(doctorId));
	}, [dispatch, doctorId]);
	return (
		<>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : null}
			{doctorDetails && <h1>Hello, I am Dr. {doctorDetails.user.name}</h1>}
		</>
	);
};

export default DoctorScreen;
