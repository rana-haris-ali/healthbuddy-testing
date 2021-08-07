import React, { useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { getOrdersListAdmin } from '../../actions/pharmacy/orderActions';

const OrderListAdminScreen = ({ history }) => {
	const dispatch = useDispatch();

	const { loading, orders, error } = useSelector(
		(state) => state.getOrdersAdmin
	);

	const { userInfo } = useSelector((state) => state.userLogin);

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(getOrdersListAdmin());
		} else {
			history.push('/login');
		}
	}, [dispatch, history, userInfo]);

	return (
		<>
			<h1>Orders</h1>

			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : orders.length !== 0 ? (
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
							<th>Order ID</th>
							<th>Username</th>
							<th>User ID</th>
							<th>Date</th>
							<th>Amount</th>
							<th>Payment Method</th>
							<th>Paid?</th>
							<th>Delivered?</th>
						</tr>
					</thead>
					<tbody>
						{orders.map((order) => {
							return (
								<tr key={order._id}>
									<td>{order._id}</td>
									<td>{order.user && order.user.name}</td>
									<td>{order.user._id}</td>
									<td>{order.createdAt.substring(0, 10)}</td>
									<td>Rs. {order.totalAmount}</td>
									<td>{order.paymentMethod}</td>
									<td>
										{order.isPaid ? (
											<i
												className='fas fa-check'
												style={{ color: 'green' }}
											></i>
										) : (
											<i className='fas fa-times' style={{ color: 'red' }}></i>
										)}
									</td>
									<td>
										{order.isDelivered ? (
											<i className='fas fa-check' style={{ color: 'green' }}>
												{order.deliveredOn.substring(0, 10)}
											</i>
										) : (
											<i className='fas fa-times' style={{ color: 'red' }}></i>
										)}
									</td>
									<td style={{ display: 'flex', justifyContent: 'center' }}>
										<LinkContainer to={`/order/${order._id}`}>
											<Button variant='light' className='btn-xs'>
												Details
											</Button>
										</LinkContainer>
									</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			) : (
				<Message variant='dark'>There are no orders to show</Message>
			)}
		</>
	);
};

export default OrderListAdminScreen;
