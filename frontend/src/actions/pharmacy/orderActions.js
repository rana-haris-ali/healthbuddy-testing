import axios from 'axios';
import {
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_CREATE_FAILURE,
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS,
	ORDER_DETAILS_FAILURE,
	ORDER_PAY_FAILURE,
	ORDER_PAY_SUCCESS,
	ORDER_PAY_REQUEST,
	MY_ORDERS_LIST_REQUEST,
	MY_ORDERS_LIST_SUCCESS,
	MY_ORDERS_LIST_FAILURE,
	GET_ALL_ORDERS_ADMIN_REQUEST,
	GET_ALL_ORDERS_ADMIN_SUCCESS,
	GET_ALL_ORDERS_ADMIN_FAILURE,
	ORDER_DELIVER_REQUEST,
	ORDER_DELIVER_SUCCESS,
	ORDER_DELIVER_FAILURE,
} from '../../constants/orderConstants';

const createOrder = (order) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_CREATE_REQUEST,
		});

		const { token } = getState().userLogin.userInfo;

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		};

		const { data } = await axios.post('/api/orders', order, config);

		dispatch({
			type: ORDER_CREATE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: ORDER_CREATE_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

const getSingleOrder = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: ORDER_DETAILS_REQUEST });

		const { token } = getState().userLogin.userInfo;

		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		const { data } = await axios.get(`/api/orders/${id}`, config);

		dispatch({
			type: ORDER_DETAILS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: ORDER_DETAILS_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

const getMyOrdersList = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: MY_ORDERS_LIST_REQUEST,
		});

		const { token } = getState().userLogin.userInfo;

		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		const { data } = await axios.get('/api/orders/myorders', config);

		dispatch({
			type: MY_ORDERS_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: MY_ORDERS_LIST_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

const payOrder = (id, paymentResult) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_PAY_REQUEST,
		});

		const { token } = getState().userLogin.userInfo;

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		};

		const { data } = await axios.put(
			`/api/orders/${id}/pay`,
			paymentResult,
			config
		);

		dispatch({
			type: ORDER_PAY_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: ORDER_PAY_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

const deliverOrder = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_DELIVER_REQUEST,
		});

		const { token } = getState().userLogin.userInfo;

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		};

		const { data } = await axios.put(`/api/orders/${id}/deliver`, {}, config);

		dispatch({
			type: ORDER_DELIVER_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: ORDER_DELIVER_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

const getOrdersListAdmin = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: GET_ALL_ORDERS_ADMIN_REQUEST,
		});

		const { token } = getState().userLogin.userInfo;

		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		const { data } = await axios.get('/api/orders', config);

		dispatch({
			type: GET_ALL_ORDERS_ADMIN_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: GET_ALL_ORDERS_ADMIN_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export {
	createOrder,
	getSingleOrder,
	payOrder,
	deliverOrder,
	getMyOrdersList,
	getOrdersListAdmin,
};
