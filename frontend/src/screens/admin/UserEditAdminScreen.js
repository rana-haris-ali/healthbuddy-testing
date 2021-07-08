import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import FormContainer from '../../components/FormContainer';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import MyModal from '../../components/MyModal';
import {
	getSingleUserAdmin,
	editUserAdmin,
} from '../../actions/pharmacy/userActions';
import { EDIT_USER_ADMIN_RESET } from '../../constants/userConstants';

const UserEditAdminScreen = ({ match }) => {
	const userId = match.params.id;

	const dispatch = useDispatch();

	const { loading, error, user } = useSelector(
		(state) => state.userDetailsAdmin
	);

	const {
		loading: loadingEdit,
		success: successEdit,
		error: errorEdit,
		updatedUser,
	} = useSelector((state) => state.userEditAdmin);

	// for modal
	const [modalShow, setModalShow] = useState(false);

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [isAdmin, setIsAdmin] = useState(false);

	// trigger modal on pressing enter key
	window.addEventListener('keyup', (e) => {
		// enter key has code 13
		if (e.keyCode === 13) {
			setModalShow(true);
		}
	});

	useEffect(() => {
		if (successEdit) {
			// reset the state
			dispatch({ type: EDIT_USER_ADMIN_RESET });
		}
		if (!user.name || user._id !== userId) {
			dispatch(getSingleUserAdmin(userId));
		} else {
			// if user was edited then show new values
			setName(updatedUser !== undefined ? updatedUser.name : user.name);
			setEmail(updatedUser !== undefined ? updatedUser.email : user.email);
			setIsAdmin(
				updatedUser !== undefined ? updatedUser.isAdmin : user.isAdmin
			);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, user, userId]);

	const submitHandler = (e) => {
		e.preventDefault();
		setModalShow(false);
		dispatch(editUserAdmin(userId, { name, email, isAdmin }));
	};

	return (
		<>
			<Link to='/admin/userList' className='btn btn-light my-3'>
				Back
			</Link>
			<FormContainer>
				<h1>Edit User</h1>

				{successEdit ? (
					<Message variant='success'>User details updated successfully</Message>
				) : null}

				{loading || loadingEdit ? (
					<Loader />
				) : error || errorEdit ? (
					<Message variant='danger'>{error || errorEdit}</Message>
				) : (
					<Form onSubmit={submitHandler}>
						<Form.Group>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type='text'
								placeholder='Username'
								value={name}
								onChange={(e) => setName(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group>
							<Form.Label>Email</Form.Label>
							<Form.Control
								type='text'
								placeholder='User Email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId='isadmin'>
							<Form.Check
								type='checkbox'
								label='Is Admin?'
								checked={isAdmin}
								onChange={(e) => setIsAdmin(e.target.checked)}
							></Form.Check>
						</Form.Group>
						<Button onClick={() => setModalShow(true)}>Edit User</Button>
					</Form>
				)}
			</FormContainer>
			<MyModal
				show={modalShow}
				onHide={() => setModalShow(false)}
				title='Confirmation'
				heading='Edit the user'
				body={`Are you sure you want to edit the user: ${user.name}`}
				buttonText='Edit'
				clickHandler={submitHandler}
			/>
		</>
	);
};

export default UserEditAdminScreen;
