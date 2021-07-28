import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import FormContainer from '../../components/FormContainer';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import MyModal from '../../components/MyModal';
import { createProduct } from '../../actions/pharmacy/productActions';
import { PRODUCT_CREATE_ADMIN_RESET } from '../../constants/productConstants';

const ProductCreateAdminScreen = ({ history }) => {
	const dispatch = useDispatch();

	const { userInfo } = useSelector((state) => state.userLogin);

	const { loading, success, error } = useSelector(
		(state) => state.productCreateAdmin
	);

	// for modal
	const [modalShow, setModalShow] = useState(false);

	const [name, setName] = useState('');
	const [image, setImage] = useState('/');
	const [brand, setBrand] = useState('');
	const [category, setCategory] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);
	const [countInStock, setCountInStock] = useState(0);

	// trigger modal on pressing enter key
	window.addEventListener('keyup', (e) => {
		e.stopPropagation();
		if (e.key === 'Enter') {
			setModalShow(true);
		}
	});

	useEffect(() => {
		// reset the state on page load and unload
		dispatch({ type: PRODUCT_CREATE_ADMIN_RESET });
	}, [dispatch]);

	useEffect(() => {
		if (!(userInfo && userInfo.isAdmin)) {
			history.push('/login');
		}
	}, [userInfo, history, success]);

	const submitHandler = (e) => {
		e.preventDefault();
		setModalShow(false);
		dispatch(
			createProduct({
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
				<h1>Create New Product</h1>

				{success ? (
					<Message variant='success'>
						Product has been created successfully
					</Message>
				) : null}

				{loading ? (
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
						<Form.Group>
							<Form.Label>Image</Form.Label>
							<Form.Control
								type='text'
								placeholder='Product Image'
								value={image}
								onChange={(e) => setImage(e.target.value)}
							></Form.Control>
						</Form.Group>
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
						<Button onClick={() => setModalShow(true)}>Create Product</Button>
					</Form>
				)}
			</FormContainer>
			<MyModal
				show={modalShow}
				onHide={() => setModalShow(false)}
				title='Confirmation'
				heading='Create new product'
				body={`Are you sure you want to create this product: ${name}`}
				buttonText='Create'
				clickHandler={submitHandler}
			/>
		</>
	);
};

export default ProductCreateAdminScreen;
