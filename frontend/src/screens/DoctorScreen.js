import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

import Rating from '../components/pharmacy/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getSingleDoctor, createDoctorReview } from '../actions/doctorActions';
import { DOCTOR_CREATE_REVIEW_RESET } from '../constants/doctorConstants';

const DoctorScreen = ({ match }) => {
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

	const doctorId = match.params.id;

	const dispatch = useDispatch();

	const { userInfo } = useSelector((state) => state.userLogin);

	const { loading, error, doctorDetails } = useSelector(
		(state) => state.doctorDetails
	);

	const {
		loading: loadingReview,
		success: successReview,
		error: errorReview,
	} = useSelector((state) => state.doctorCreateReview);

	useEffect(() => {
		dispatch({ type: DOCTOR_CREATE_REVIEW_RESET });
	}, [dispatch]);

	useEffect(() => {
		if (successReview) {
			setValidationMessage('');
			setRating(0);
			setComment('');
		}
		dispatch(getSingleDoctor(doctorId));
	}, [dispatch, doctorId, successReview]);

	useEffect(() => {
		setViewport({
			width: '100%',
			height: 500,
			latitude: doctorDetails?.coordinates?.latitude || 30.3753,
			longitude: doctorDetails?.coordinates?.longitude || 69.3451,
			zoom: 10,
		});
	}, [doctorDetails]);

	const submitReviewHandler = (e) => {
		e.preventDefault();
		if (rating === 0 || rating === '') {
			setValidationMessage('Please select a rating');
		} else if (comment === '') {
			setValidationMessage('Please add a comment');
		} else {
			setValidationMessage('');
			dispatch(
				createDoctorReview(doctorId, {
					rating,
					comment,
				})
			);
		}
	};

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
									<h1>Dr. {doctorDetails.user.name}</h1>{' '}
									{doctorDetails.isVerified ? (
										<i
											className='fas fa-check'
											style={{ color: 'green', fontSize: 'larger' }}
										>
											{' '}
											Verified
										</i>
									) : (
										<i
											className='fas fa-times'
											style={{ color: 'red', fontSize: 'larger' }}
										>
											{' '}
											UnVerified
										</i>
									)}
								</ListGroup.Item>
								<ListGroup.Item className='py-3'>
									<Rating
										value={doctorDetails.rating}
										text={`${doctorDetails.numReviews} reviews`}
									/>
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
					<Row>
						<Col md={6}>
							<h2>Reviews</h2>
							{doctorDetails.reviews.length === 0 && (
								<Message>No Reviews</Message>
							)}
							<ListGroup variant='flush'>
								{doctorDetails.reviews.map((review) => (
									<ListGroup.Item key={review._id}>
										<strong style={{ fontWeight: '700' }}>{review.name}</strong>
										<p>{review.createdAt.substring(0, 10)}</p>
										<div className='mx-3'>
											<p>{review.comment}</p>
											<Rating value={review.rating}></Rating>
										</div>
									</ListGroup.Item>
								))}
								{/* only patients can write reviews */}
								{userInfo?.role === 'Patient' && userInfo?.isAdmin === false ? (
									<ListGroup.Item>
										<h2>Write a Review</h2>
										{loadingReview && <Loader />}

										{validationMessage ? (
											<Message variant='danger'>{validationMessage}</Message>
										) : successReview ? (
											<Message variant='success'>
												Review has been added successfully
											</Message>
										) : errorReview ? (
											<Message variant='danger'>{errorReview}</Message>
										) : null}

										{userInfo ? (
											<Form onSubmit={submitReviewHandler}>
												<Form.Group controlId='rating'>
													<Form.Label>Rating</Form.Label>
													<Form.Control
														as='select'
														value={rating}
														onChange={(e) => setRating(e.target.value)}
													>
														<option value=''>Select</option>
														<option value='1'>1 - Poor</option>
														<option value='2'>2 - Fair</option>
														<option value='3'>3 - Good</option>
														<option value='4'>4 - Very Good</option>
														<option value='5'>5 - Excellent</option>
													</Form.Control>
												</Form.Group>
												<Form.Group controlId='comment'>
													<Form.Label>Comment</Form.Label>
													<Form.Control
														as='textarea'
														row='3'
														value={comment}
														onChange={(e) => setComment(e.target.value)}
													></Form.Control>
												</Form.Group>
												<Button type='submit' variant='primary'>
													Submit
												</Button>
											</Form>
										) : (
											<Message>
												Please{' '}
												<Link to={`/login?redirect=/doctors/${doctorId}`}>
													login
												</Link>{' '}
												to write a review
											</Message>
										)}
									</ListGroup.Item>
								) : null}
							</ListGroup>
						</Col>
					</Row>
				</div>
			)}
		</>
	);
};

export default DoctorScreen;
