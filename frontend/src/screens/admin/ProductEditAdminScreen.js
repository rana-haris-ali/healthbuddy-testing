import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Image, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

import FormContainer from '../../components/FormContainer';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import MyModal from '../../components/MyModal';
import {
	singleProductDetails,
	editProduct,
} from '../../actions/pharmacy/productActions';
import {
	PRODUCT_DETAILS_RESET,
	PRODUCT_EDIT_ADMIN_RESET,
} from '../../constants/productConstants';

const ProductEditAdminScreen = ({ history, match }) => {
	const productId = match.params.id;

	const dispatch = useDispatch();

	const { userInfo } = useSelector((state) => state.userLogin);

	const { loading, success, error, product } = useSelector(
		(state) => state.productDetails
	);

	const {
		loading: loadingEdit,
		success: successEdit,
		error: errorEdit,
		updatedProduct,
	} = useSelector((state) => state.productEditAdmin);

	// for modal
	const [modalShow, setModalShow] = useState(false);

	const [name, setName] = useState('');
	const [image, setImage] = useState('/');
	const [brand, setBrand] = useState('');
	const [category, setCategory] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);
	const [countInStock, setCountInStock] = useState(0);
	const [uploading, setUploading] = useState(false);

	//  state to track errors that occur on image upload
	const [uploadingError, setUploadingError] = useState('');

	// trigger modal on pressing enter key
	window.addEventListener('keyup', (e) => {
		e.stopPropagation();
		// enter key has code 13
		if (e.key === 'Enter') {
			setModalShow(true);
		}
	});

	useEffect(() => {
		// reset the state on page load and unload
		dispatch({ type: PRODUCT_EDIT_ADMIN_RESET });
		dispatch({ type: PRODUCT_DETAILS_RESET });
	}, [dispatch]);

	useEffect(() => {
		if (!(userInfo && userInfo.isAdmin)) {
			history.push('/login');
		}

		if (!(product && product.name)) {
			dispatch(singleProductDetails(productId));
		} else {
			// if user was edited then show new values
			setName(
				updatedProduct !== undefined ? updatedProduct.name : product.name
			);
			setImage(
				updatedProduct !== undefined ? updatedProduct.image : product.image
			);
			setBrand(
				updatedProduct !== undefined ? updatedProduct.brand : product.brand
			);
			setCategory(
				updatedProduct !== undefined
					? updatedProduct.category
					: product.category
			);
			setDescription(
				updatedProduct !== undefined
					? updatedProduct.description
					: product.description
			);
			setPrice(
				updatedProduct !== undefined ? updatedProduct.price : product.price
			);
			setCountInStock(
				updatedProduct !== undefined
					? updatedProduct.countInStock
					: product.countInStock
			);
		}
	}, [
		dispatch,
		productId,
		userInfo,
		history,
		success,
		product,
		updatedProduct,
	]);

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

			const { data } = await axios.post(
				'/api/uploads/productImage',
				formData,
				config
			);
			console.log(data);
			setImage(data);
			setUploading(false);
		} catch (error) {
			setUploadingError(error);
			setUploading(false);
		}
	};

	const submitHandler = (e) => {
		e.preventDefault();
		setModalShow(false);
		dispatch(
			editProduct(productId, {
				name,
				image,
				brand,
				category,
				description,
				price,
				countInStock,
			})
		);
	};

	return (
		<>
			<Link to='/admin/productList' className='btn btn-light my-3'>
				Back
			</Link>
			<FormContainer>
				<h1>Edit Product</h1>

				{successEdit && (
					<Message variant='success'>
						Product has been edited successfully
					</Message>
				)}

				{errorEdit && <Message variant='danger'>{errorEdit}</Message>}

				{uploadingError && <Message variant='danger'>{uploadingError}</Message>}

				{loading || loadingEdit ? (
					<Loader />
				) : error ? (
					<Message variant='danger'>{error}</Message>
				) : (
					<Form onSubmit={submitHandler}>
						<Form.Group>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type='text'
								placeholder='Product Name'
								value={name}
								onChange={(e) => setName(e.target.value)}
							></Form.Control>
						</Form.Group>
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
								) : (
									<Image src={image} className='w-75 mt-3' />
								)}
							</Col>
						</Row>

						<Form.Group>
							<Form.Label>Brand</Form.Label>
							<Form.Control
								type='text'
								placeholder='Product Brand'
								value={brand}
								onChange={(e) => setBrand(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group>
							<Form.Label>Category</Form.Label>
							<Form.Control
								type='text'
								placeholder='Product Category'
								value={category}
								onChange={(e) => setCategory(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group>
							<Form.Label>Description</Form.Label>
							<Form.Control
								type='text'
								placeholder='Product Description'
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group>
							<Form.Label>Price</Form.Label>
							<Form.Control
								type='number'
								placeholder='Product Price'
								value={price}
								onChange={(e) => setPrice(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group>
							<Form.Label>Quantity</Form.Label>
							<Form.Control
								type='number'
								placeholder='Product Quantity'
								value={countInStock}
								onChange={(e) => setCountInStock(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Button onClick={() => setModalShow(true)}>Edit Product</Button>
					</Form>
				)}
			</FormContainer>
			<MyModal
				show={modalShow}
				onHide={() => setModalShow(false)}
				title='Confirmation'
				heading='Edit product'
				body={`Are you sure you want to edit this product: ${name}`}
				buttonText='Edit'
				clickHandler={submitHandler}
			/>
		</>
	);
};

export default ProductEditAdminScreen;
