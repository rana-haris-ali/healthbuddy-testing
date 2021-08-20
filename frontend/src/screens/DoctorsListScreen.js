import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getDoctorsList } from '../actions/doctorActions';

const DoctorsListScreen = ({ history }) => {
	const dispatch = useDispatch();

	const { userInfo } = useSelector((state) => state.userLogin);

	const { loading, doctors, error } = useSelector((state) => state.doctorsList);

	useEffect(() => {
		if (!userInfo) {
			history.push('/login');
		} else {
			dispatch(getDoctorsList());
		}
	}, [userInfo, dispatch]);

	return (
		<>
			<h1>Doctors</h1>
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
						<th></th>
					</tr>
				</thead>
				<tbody>
					{doctors.map((doctor) => {
						return (
							<tr key={doctor._id}>
								<td>{doctor.user.name}</td>
								<td>{doctor._id}</td>
								<td>
									<a href={`mailto:${doctor.user.email}`}>
										{doctor.user.email}
									</a>
								</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
		</>
	);
	// return (
	// 	<>
	// 		<h1>Doctors</h1>(
	// 		<Table
	// striped
	// bordered
	// hover
	// responsive
	// className='table-sm'
	// style={{ textAlign: 'center' }}
	// 		>
	// <thead>
	// 	<tr>
	// 		<th>Name</th>
	// 		<th>ID</th>
	// 		<th>Email</th>
	// 		<th>Admin</th>
	// 		<th></th>
	// 	</tr>
	// </thead>;
	// <tbody>
	// 	{users.map((user) => {
	// 		return (
	// 			<tr key={user._id}>
	// 				<td>{user.name}</td>
	// 				<td>{user._id}</td>
	// 				<td>
	// 					<a href={`mailto:${user.email}`}>{user.email}</a>
	// 				</td>
	// 				<td>
	// 					{user.isAdmin ? (
	// 						<i className='fas fa-check' style={{ color: 'green' }}></i>
	// 					) : (
	// 						<i className='fas fa-times' style={{ color: 'red' }}></i>
	// 					)}
	// 				</td>
	// 				<td style={{ display: 'flex', justifyContent: 'center' }}>
	// 					<LinkContainer to={`/admin/user/${user._id}/edit`}>
	// 						<Button variant='light' className='btn-sm'>
	// 							<i className='fas fa-edit'></i>
	// 						</Button>
	// 					</LinkContainer>
	// 					<Button
	// 						style={{ margin: '0 15px' }}
	// 						variant='danger'
	// 						className='btn-sm'
	// 						onClick={() => {
	// 							setDeleteId(user._id);
	// 							setDeleteName(user.name);
	// 							setModalShow(true);
	// 						}}
	// 					>
	// 						<i className='fas fa-trash'></i>
	// 					</Button>
	// 				</td>
	// 			</tr>
	// 		);
	// 	})}
	// </tbody>
	// 			<MyModal
	// 				show={modalShow}
	// 				onHide={() => setModalShow(false)}
	// 				title='Confirmation'
	// 				heading='Delete the user'
	// 				body={`Are you sure you want to delete the user: ${deleteName}`}
	// 				buttonText='Delete'
	// 				clickHandler={() => deleteHandler(deleteId)}
	// 			/>
	// 		</Table>
	// 		) : (<Message variant='dark'>There are no users to show</Message>
	// 		)}
	// 	</>
	// );
};

export default DoctorsListScreen;
