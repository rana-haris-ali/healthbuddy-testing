import React, { useEffect, useState } from 'react';
import { Row, Col, Image, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { lungsPrediction } from '../../actions/predictionActions';
import { LUNGS_PREDICTION_RESET } from '../../constants/predictionConstants';
import './LungsPredictionScreen.css';

const PredictionScreen = () => {
	const dispatch = useDispatch();

	const [image, setImage] = useState('/');

	const [uploading, setUploading] = useState(false);

	//  state to track errors that occur on image upload
	const [uploadingError, setUploadingError] = useState('');

	const { loading, error, response } = useSelector(
		(state) => state.lungsPrediction
	);

	useEffect(() => {
		// dispatch({ type: LUNGS_PREDICTION_RESET });
	}, []);

	const uploadImageHandler = async (e) => {
		const file = e.target.files[0];
		console.log(file);
		const formData = new FormData();
		formData.append('image', file);
		setUploading(true);

		try {
			const config = {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			};

			console.log(formData);

			const { data } = await axios.post(
				'/api/uploads/productImage',
				formData,
				config
			);
			console.log(data);
			setImage(data);
			setUploading(false);
		} catch (error) {
			console.log(error);
			setUploadingError(error);
			setUploading(false);
		}
	};

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(lungsPrediction(image));
	};
	return (
		<>
			<h1 className='mb-5'>Lungs Irregularity Detection</h1>

			{uploadingError && <Message variant='danger'>{uploadingError}</Message>}

			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Form onSubmit={submitHandler}>
					<Row>
						<Col md='8'>
							<Form.Group controlId='image'>
								<Form.Label>Image</Form.Label>
								<Form.Control
									type='text'
									placeholder='Enter Image URL'
									value={image}
									onChange={(e) => setImage(e.target.value)}
								></Form.Control>
								<Form.File
									id='image-file'
									custom
									accept='.png, .jpg, .jpeg'
									onChange={uploadImageHandler}
								></Form.File>
							</Form.Group>
						</Col>
						<Col>
							{uploading ? (
								<Loader />
							) : image === '/' ? null : (
								<Image src={image} className='w-75 mt-3' />
							)}
						</Col>
					</Row>
					<Button type='submit' className='my-5'>
						Detect
					</Button>
					{response && (
						<>
							<h4>
								Our model detects that you're{' '}
								<span
									className={
										response.prediction === 'Irregularity Positive'
											? 'red'
											: 'green'
									}
								>
									{response.prediction}
								</span>{' '}
								with probability of{' '}
								<span
									className={
										response.prediction === 'Irregularity Positive'
											? 'red'
											: 'green'
									}
								>
									{`${response.probability}%`}
								</span>
							</h4>
							<h5 className='mt-5'>
								You can contact a qualified doctor by going to{' '}
								<Link to='/doctors'>Contact Doctors</Link> page and selecting
								doctor from the list
							</h5>
						</>
					)}
				</Form>
			)}
		</>
	);
};

export default PredictionScreen;
