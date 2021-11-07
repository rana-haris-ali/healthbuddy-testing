import React, { useState, useEffect } from 'react';
import { Table, Row, Col, Form, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { getMyOrdersList } from '../../actions/pharmacy/orderActions';

const MyOrdersScreen = ({ history }) => {
	const dispatch = useDispatch();

	const { userInfo } = useSelector((state) => state.userLogin);

	const { loading, orders, error } = useSelector((state) => state.myOrdersList);

	useEffect(() => {
		if (!userInfo) {
			// if user isn't logged in, redirect to login
			history.push('/login');
		}
		// if (orders?.length === 0) {
		// fetch orders on page load when orders array is empty
		dispatch(getMyOrdersList());
		// }
	}, [history, dispatch]);

	return (
		<>
			<h1 className='text-center my-3'>Orders</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : orders.length === 0 ? (
				<Message variant='dark'>No Orders to Show</Message>
			) : (
				<Table striped bordered hover responsive className='table-sm'>
					<thead>
						<tr>
							<th>ID</th>
							<th>Date</th>
							<th>Total</th>
							<th>Paid</th>
							<th>Delivered</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{orders.map((order) => {
							return (
								<tr key={order._id}>
									<td>{order._id}</td>
									<td>{order.createdAt.substring(0, 10)}</td>
									<td>Rs. {order.totalAmount}</td>
									<td>
										{order.isPaid ? (
											order.paidOn.substring(0, 10)
										) : (
											<i className='fas fa-times' style={{ color: 'red' }}></i>
										)}
									</td>
									<td>
										{order.isDelivered ? (
											order.deliveredOn.substring(0, 10)
										) : (
											<i className='fas fa-times' style={{ color: 'red' }}></i>
										)}
									</td>
									<td>
										<LinkContainer to={`/order/${order._id}`}>
											<Button className='btn-sm' variant='light'>
												Details
											</Button>
										</LinkContainer>
									</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			)}
		</>
	);
};

export default MyOrdersScreen;
