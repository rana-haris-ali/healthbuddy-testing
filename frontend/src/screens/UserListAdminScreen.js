import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Message from '../components/Message';
import Loader from '../components/Loader';
import MyModal from '../components/MyModal';
import { getAllUserList, deleteUser } from '../actions/pharmacy/userActions';

const UserListAdminScreen = ({ history }) => {
	// state to control modal window
	const [modalShow, setModalShow] = useState(false);
	// state to track the username that is being deleted
	const [deleteName, setDeleteName] = useState(false);
	// state to track the username's ID that is being deleted
	const [deleteId, setDeleteId] = useState(false);

	const dispatch = useDispatch();

	const { loading, users, error } = useSelector((state) => state.userList);

	const { userInfo } = useSelector((state) => state.userLogin);

	const { success: successDelete, error: errorDelete } = useSelector(
		(state) => state.userDelete
	);

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(getAllUserList());
		} else {
			history.push('/login');
		}
	}, [dispatch, history, userInfo, successDelete]);

	const deleteHandler = (id) => {
		dispatch(deleteUser(id));
		setModalShow(false);
	};

	return (
		<>
			<h1>Users</h1>
			{successDelete ? (
				<Message variant='success'>User Deleted Successfully</Message>
			) : errorDelete ? (
				<Message variant='danger'>{errorDelete}</Message>
			) : null}
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : users.length !== 0 ? (
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
							<th>Email</th>
							<th>Admin</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => {
							return (
								<tr key={user._id}>
									<td>{user.name}</td>
									<td>{user._id}</td>
									<td>
										<a href={`mailto:${user.email}`}>{user.email}</a>
									</td>
									<td>
										{user.isAdmin ? (
											<i
												className='fas fa-check'
												style={{ color: 'green' }}
											></i>
										) : (
											<i className='fas fa-times' style={{ color: 'red' }}></i>
										)}
									</td>
									<td style={{ display: 'flex', justifyContent: 'center' }}>
										<LinkContainer to={`/user/${user._id}/edit`}>
											<Button variant='light' className='btn-sm'>
												<i className='fas fa-edit'></i>
											</Button>
										</LinkContainer>
										<Button
											style={{ margin: '0 15px' }}
											variant='danger'
											className='btn-sm'
											onClick={() => {
												setDeleteId(user._id);
												setDeleteName(user.name);
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
						heading='Delete the user'
						body={`Are you sure you want to delete the user: ${deleteName}`}
						buttonText='Delete'
						clickHandler={() => deleteHandler(deleteId)}
					/>
				</Table>
			) : (
				<Message variant='dark'>There are no users to show</Message>
			)}
		</>
	);
};

export default UserListAdminScreen;
