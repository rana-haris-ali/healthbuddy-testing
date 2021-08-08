import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, Button, ListGroup, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Rating from '../../components/pharmacy/Rating';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import {
	singleProductDetails,
	createProductReview,
} from '../../actions/pharmacy/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../../constants/productConstants';
// product screen

const ProductScreen = ({ match, history }) => {
	const productId = match.params.id;

	const [qty, setQty] = useState(1);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState('');

	// state for displaying review validation messages
	const [validationMessage, setValidationMessage] = useState('');

	const dispatch = useDispatch();

	const { userInfo } = useSelector((state) => state.userLogin);

	const productDetails = useSelector((state) => state.productDetails);
	const { loading, error, product } = productDetails;

	const {
		loading: loadingReview,
		success: successReview,
		error: errorReview,
	} = useSelector((state) => state.productCreateReview);

	useEffect(() => {
		dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
	}, [dispatch]);

	useEffect(() => {
		if (successReview) {
			setValidationMessage('');
			setRating(0);
			setComment('');
		}
		dispatch(singleProductDetails(match.params.id));
	}, [dispatch, match, successReview]);

	const addToCartHandler = () => {
		history.push(`/cart/${match.params.id}?qty=${qty}`);
	};

	const submitReviewHandler = (e) => {
		e.preventDefault();
		if (rating === 0 || rating === '') {
			setValidationMessage('Please select a rating');
		} else if (comment === '') {
			setValidationMessage('Please add a comment');
		} else {
			dispatch(
				createProductReview(productId, {
					rating,
					comment,
				})
			);
		}
	};

	return (
		<>
			<Link to='/' className='btn btn-dark my-3'>
				Back
			</Link>

			{/* render product details conditionally */}
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<>
					<Row>
						<Col md={6}>
							<Image src={product.image} alt={product.name} fluid />
						</Col>
						<Col md={3}>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<h3>{product.name}</h3>
								</ListGroup.Item>
								<ListGroup.Item>
									<Rating
										value={product.rating}
										text={`${product.numReviews} reviews`}
									/>
								</ListGroup.Item>
								<ListGroup.Item>
									Price: <strong>Rs. {product.price}</strong>
								</ListGroup.Item>
								<ListGroup.Item>
									Description: {product.description}
								</ListGroup.Item>
							</ListGroup>
						</Col>
						<Col md={3}>
							<ListGroup>
								<ListGroup.Item>
									<Row>
										<Col>Price:</Col>
										<Col>
											<strong>Rs. {product.price}</strong>
										</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Status:</Col>
										<Col>
											{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
										</Col>
									</Row>
								</ListGroup.Item>
								{product.countInStock > 0 && (
									<ListGroup.Item>
										<Row>
											<Col>Quantity:</Col>
											<Col>
												<Form.Control
													as='select'
													value={qty}
													onChange={(e) => setQty(e.target.value)}
												>
													{/* render dropdown list of available quantity options */}
													{[...Array(product.countInStock).keys()].map(
														(option) => (
															<option key={option + 1} value={option + 1}>
																{option + 1}
															</option>
														)
													)}
												</Form.Control>
											</Col>
										</Row>
									</ListGroup.Item>
								)}

								<ListGroup.Item>
									<Button
										onClick={addToCartHandler}
										className='btn-block'
										type='button'
										disabled={product.countInStock === 0}
									>
										Order Now
									</Button>
								</ListGroup.Item>
							</ListGroup>
						</Col>
					</Row>
					<Row>
						<Col md={6}>
							<h2>Reviews</h2>
							{product.reviews.length === 0 && <Message>No Reviews</Message>}
							<ListGroup variant='flush'>
								{product.reviews.map((review) => (
									<ListGroup.Item key={review._id}>
										<strong style={{ fontWeight: '700' }}>{review.name}</strong>
										<p>{review.createdAt.substring(0, 10)}</p>
										<div className='mx-3'>
											<p>{review.comment}</p>
											<Rating value={review.rating}></Rating>
										</div>
									</ListGroup.Item>
								))}
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
											<Link to={`/login?redirect=/products/${product._id}`}>
												login
											</Link>{' '}
											to write a review
										</Message>
									)}
								</ListGroup.Item>
							</ListGroup>
						</Col>
					</Row>
				</>
			)}
		</>
	);
};

export default ProductScreen;
