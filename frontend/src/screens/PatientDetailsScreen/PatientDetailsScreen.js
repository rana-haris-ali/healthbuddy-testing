import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { GET_SINGLE_PATIENT_RESET } from '../../constants/patientConstants';
import { getSinglePatient } from '../../actions/patientActions';

const PatientDetailsScreen = ({ history, match }) => {
	const [viewport, setViewport] = useState({
		width: '100%',
		height: 500,
		latitude: 30.3753,
		longitude: 69.3451,
		zoom: 5,
	});

	const [popupClick, setPopupClick] = useState(false);

	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState('');
	// state for displaying review validation messages
	const [validationMessage, setValidationMessage] = useState('');

	const patientId = match.params.id;

	const dispatch = useDispatch();

	const { userInfo } = useSelector((state) => state.userLogin);

	const { loading, error, patientDetails } = useSelector(
		(state) => state.patientDetails
	);

	useEffect(() => {
		if (!userInfo || userInfo?.role !== 'Doctor') {
			history.push('/login');
		}
	}, [userInfo]);

	useEffect(() => {
		dispatch({ type: GET_SINGLE_PATIENT_RESET });
	}, []);

	useEffect(() => {
		dispatch(getSinglePatient(patientId));
	}, [dispatch, patientId]);

	useEffect(() => {
		setViewport({
			width: '100%',
			height: 500,
			latitude: patientDetails?.coordinates?.latitude || 30.3753,
			longitude: patientDetails?.coordinates?.longitude || 69.3451,
			zoom: 10,
		});
	}, [patientDetails]);

	return (
		<>
			<Link to='/patients' className='btn btn-primary my-3'>
				Back
			</Link>
			<h1
				className='text-center mb-3'
				style={{ fontSize: '2rem', fontWeight: '700' }}
			>
				Patient Information
			</h1>
			<hr />
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : null}
			{patientDetails && (
				<div style={{ overflow: 'hidden' }}>
					<Row>
						<Col md={6}>
							{/* <h1>Dr. {patientDetails.user.name}</h1>
							<h5 className='d-inline'>About: </h5>
							<p className='d-inline'></p> */}
							<ListGroup variant='flush' className='mt-3'>
								<ListGroup.Item>
									<h1>Mr. {patientDetails.user.name}</h1>{' '}
								</ListGroup.Item>
								<ListGroup.Item className='mt-3'>
									<p style={{ fontSize: '18px' }}>
										<span style={{ fontWeight: '700' }}>Known Diseases:</span>{' '}
										{patientDetails.diseases.join(', ')}
									</p>
								</ListGroup.Item>
								<ListGroup.Item className='mt-3'>
									<p style={{ fontSize: '18px' }}>
										<span style={{ fontWeight: '700' }}>
											Medical Information:
										</span>{' '}
										{patientDetails.medicalInfo}
									</p>
								</ListGroup.Item>
							</ListGroup>
						</Col>
						<Col md={6} className='mt-5'>
							<ReactMapGL
								{...viewport}
								onViewportChange={(viewport) => setViewport(viewport)}
								mapboxApiAccessToken={
									'pk.eyJ1IjoicmFuYS1oYXJpcy1hbGkiLCJhIjoiY2t1NXd3NGszMW54dTJwcWhnc3BrOXp2cSJ9.DH5z_oGb8q_B4EhgqLr1Ug'
								}
								mapStyle='mapbox://styles/rana-haris-ali/cku6vluo33yq917nxmcr7r6j2'
							>
								<Marker
									latitude={patientDetails.coordinates?.latitude || 30.3753}
									longitude={patientDetails.coordinates?.longitude || 69.3451}
								>
									<div
										className='text-center'
										style={{ fontWeight: '900', color: '#bf6c50' }}
										onClick={() => setPopupClick(true)}
									>
										<i className='fas fa-clinic-medical'></i>
										<br />
										<span> Mr. {patientDetails.user.name}</span>
									</div>
								</Marker>
								{popupClick && (
									<Popup
										latitude={patientDetails.coordinates?.latitude || 30.3753}
										longitude={patientDetails.coordinates?.longitude || 69.3451}
										onClose={() => setPopupClick(false)}
									>
										Mr. {patientDetails.user.name}
									</Popup>
								)}
							</ReactMapGL>
						</Col>
					</Row>
				</div>
			)}
		</>
	);
};

export default PatientDetailsScreen;
