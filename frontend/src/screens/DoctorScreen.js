import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

import Rating from '../components/pharmacy/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getSingleDoctor } from '../actions/doctorActions';

const DoctorScreen = ({ match }) => {
	const [viewport, setViewport] = useState({
		width: '100%',
		height: 500,
		latitude: 30.3753,
		longitude: 69.3451,
		zoom: 5,
	});

	const [popupClick, setPopupClick] = useState(false);

	const doctorId = match.params.id;

	const dispatch = useDispatch();

	const { loading, error, doctorDetails } = useSelector(
		(state) => state.doctorDetails
	);

	useEffect(() => {
		dispatch(getSingleDoctor(doctorId));
	}, [dispatch, doctorId]);

	useEffect(() => {
		setViewport({
			width: '100%',
			height: 500,
			latitude: doctorDetails?.coordinates?.latitude || 30.3753,
			longitude: doctorDetails?.coordinates?.longitude || 69.3451,
			zoom: 10,
		});
	}, [doctorDetails]);
	return (
		<>
			<Link to='/doctors' className='btn btn-primary my-3'>
				Back
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : null}
			{doctorDetails && (
				<div style={{ overflow: 'hidden' }}>
					<Row>
						<Col md={6}>
							{/* <h1>Dr. {doctorDetails.user.name}</h1>
							<h5 className='d-inline'>About: </h5>
							<p className='d-inline'></p> */}
							<ListGroup variant='flush' className='mt-3'>
								<ListGroup.Item>
									<h1>Dr. {doctorDetails.user.name}</h1>
								</ListGroup.Item>
								<ListGroup.Item className='py-3'>
									<Rating value={0} text={'0 reviews'} />
								</ListGroup.Item>
								<ListGroup.Item className='mt-3'>
									<p style={{ fontSize: '18px' }}>
										<span style={{ fontWeight: '700' }}>Description:</span> I am
										very good doc. I am very good doc. I am very good doc. I am
										very good doc. I am very good doc. I am very good doc.
									</p>
								</ListGroup.Item>
								<ListGroup.Item className='mt-3'>
									<p style={{ fontSize: '18px' }}>
										<span style={{ fontWeight: '700' }}>Degrees:</span> MBBS,
										FCPS, MRCS
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
									latitude={doctorDetails.coordinates?.latitude || 30.3753}
									longitude={doctorDetails.coordinates?.longitude || 69.3451}
								>
									<div
										className='text-center'
										style={{ fontWeight: '900', color: '#bf6c50' }}
										onClick={() => setPopupClick(true)}
									>
										<i className='fas fa-clinic-medical'></i>
										<br />
										<span> Dr. {doctorDetails.user.name}</span>
									</div>
								</Marker>
								{popupClick && (
									<Popup
										latitude={doctorDetails.coordinates?.latitude || 30.3753}
										longitude={doctorDetails.coordinates?.longitude || 69.3451}
										onClose={() => setPopupClick(false)}
									>
										Dr. {doctorDetails.user.name}
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

export default DoctorScreen;
