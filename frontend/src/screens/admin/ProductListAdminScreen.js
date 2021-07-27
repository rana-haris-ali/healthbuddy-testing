import React, { useEffect, useState } from 'react';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Message from '../../components/Message';
import Loader from '../../components/Loader';
import MyModal from '../../components/MyModal';
import { productList } from '../../actions/pharmacy/productActions';

const ProductListAdminScreen = ({ history, match }) => {
	// state to control modal window
	const [modalShow, setModalShow] = useState(false);
	// state to track the username that is being deleted
	const [deleteName, setDeleteName] = useState(false);
	// state to track the username's ID that is being deleted
	const [deleteId, setDeleteId] = useState(false);

	const dispatch = useDispatch();

	const { loading, products, error } = useSelector(
		(state) => state.productList
	);

	const { userInfo } = useSelector((state) => state.userLogin);

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(productList());
		} else {
			history.push('/login');
		}
	}, [dispatch, history, userInfo]);

	const createProductHandler = () => {
		// CREATE PRODUCT
	};

	const deleteHandler = (id) => {
		// dispatch(deleteUserAdmin(id));
		setModalShow(false);
	};

	return (
		<>
			<Row className='align-items-center'>
				<Col>
					<h1>Products</h1>
				</Col>
				<Col className='text-right'>
					<Button className='my-3' onClick={createProductHandler}>
						<i className='fas fa-plus'></i> Create Product
					</Button>
				</Col>
			</Row>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : products.length !== 0 ? (
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
							<th>Price</th>
							<th>Category</th>
							<th>Brand</th>
							<th>Quantity</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{products.map((product) => {
							return (
								<tr key={product._id}>
									<td>{product.name}</td>
									<td>{product._id}</td>
									<td>Rs. {product.price}</td>
									<td>{product.category}</td>
									<td>{product.brand}</td>
									<td>{product.countInStock}</td>
									<td style={{ display: 'flex', justifyContent: 'center' }}>
										<LinkContainer to={`/admin/product/${product._id}/edit`}>
											<Button variant='light' className='btn-sm'>
												<i className='fas fa-edit'></i>
											</Button>
										</LinkContainer>
										<Button
											style={{ margin: '0 15px' }}
											variant='danger'
											className='btn-sm'
											onClick={() => {
												setDeleteId(product._id);
												setDeleteName(product.name);
												setModalShow(true);
											}}
										>
											<i className='fas fa-trash'></i>
										</Button>
									</td>
								</tr>
							);
						})}
					</tbody>
					<MyModal
						show={modalShow}
						onHide={() => setModalShow(false)}
						title='Confirmation'
						heading='Delete the product'
						body={`Are you sure you want to delete the product: ${deleteName}`}
						buttonText='Delete'
						clickHandler={() => deleteHandler(deleteId)}
					/>
				</Table>
			) : (
				<Message variant='dark'>There are no products to show</Message>
			)}
		</>
	);
};

export default ProductListAdminScreen;
