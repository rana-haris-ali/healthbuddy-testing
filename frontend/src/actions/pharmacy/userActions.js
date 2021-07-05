import axios from 'axios';
import { MY_ORDERS_LIST_RESET } from '../../constants/orderConstants';
import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAILURE,
	USER_LOGOUT,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAILURE,
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
	USER_DETAILS_FAILURE,
	USER_UPDATE_PROFILE_REQUEST,
	USER_UPDATE_PROFILE_SUCCESS,
	USER_UPDATE_PROFILE_FAILURE,
	USER_DETAILS_RESET,
	ADMIN_ALL_USERS_LIST_REQUEST,
	ADMIN_ALL_USERS_LIST_SUCCESS,
	ADMIN_ALL_USERS_LIST_FAILURE,
	ADMIN_ALL_USERS_LIST_RESET,
	ADMIN_DELETE_USER_REQUEST,
	ADMIN_DELETE_USER_SUCCESS,
	ADMIN_DELETE_USER_FAILURE,
} from '../../constants/userConstants';

const login = (email, password) => async (dispatch) => {
	try {
		dispatch({
			type: USER_LOGIN_REQUEST,
		});

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const { data } = await axios.post(
			'/api/users/login',
			{ email, password },
			config
		);

		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data,
		});

		localStorage.setItem('userInfo', JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: USER_LOGIN_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

const logout = () => (dispatch) => {
	localStorage.removeItem('userInfo');
	dispatch({ type: USER_LOGOUT });
	dispatch({ type: USER_DETAILS_RESET });
	dispatch({ type: MY_ORDERS_LIST_RESET });
	dispatch({ type: ADMIN_ALL_USERS_LIST_RESET });
};

const register = (name, email, password) => async (dispatch) => {
	try {
		dispatch({
			type: USER_REGISTER_REQUEST,
		});

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const { data } = await axios.post(
			'/api/users',
			{ name, email, password },
			config
		);

		dispatch({
			type: USER_REGISTER_SUCCESS,
			payload: data,
		});

		// log in the user right after registeration
		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data,
		});

		localStorage.setItem('userInfo', JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: USER_REGISTER_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

const getUserDetails = (endpoint) => async (dispatch, getState) => {
	// endpoint argument enables this action creator to be reused across
	// different endpoints

	try {
		dispatch({
			type: USER_DETAILS_REQUEST,
		});

		// get token from state
		const {
			userLogin: {
				userInfo: { token },
			},
		} = getState();

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		};

		const { data } = await axios.get(`/api/users/${endpoint}`, config);

		dispatch({
			type: USER_DETAILS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: USER_DETAILS_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

const updateUserDetails = (user) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_UPDATE_PROFILE_REQUEST,
		});

		// get token from state
		const {
			userLogin: {
				userInfo: { token },
			},
		} = getState();

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		};

		const { data } = await axios.put(`/api/users/profile`, user, config);

		dispatch({
			type: USER_UPDATE_PROFILE_SUCCESS,
			payload: data,
		});

		// login the user with the updated details

		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data,
		});

		// get the user details again so that the updated info
		// can be shown on the profile. Send hand-picked properties excluding token.

		dispatch({
			type: USER_DETAILS_SUCCESS,
			payload: {
				_id: data._id,
				name: data.name,
				email: data.email,
				isAdmin: data.isAdmin,
			},
		});
	} catch (error) {
		dispatch({
			type: USER_UPDATE_PROFILE_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

// get all users list for admin use
const getAllUserList = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: ADMIN_ALL_USERS_LIST_REQUEST,
		});

		// get token from state
		const {
			userLogin: {
				userInfo: { token },
			},
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		const { data } = await axios.get(`/api/users`, config);

		dispatch({
			type: ADMIN_ALL_USERS_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: ADMIN_ALL_USERS_LIST_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

// FOR ADMIN USE
// delete particular user
const deleteUser = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ADMIN_DELETE_USER_REQUEST,
		});

		// get token from state
		const {
			userLogin: {
				userInfo: { token },
			},
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		const { data } = await axios.delete(`/api/users/${id}`, config);

		dispatch({
			type: ADMIN_DELETE_USER_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: ADMIN_DELETE_USER_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export {
	login,
	logout,
	register,
	getUserDetails,
	updateUserDetails,
	getAllUserList,
	deleteUser,
};
