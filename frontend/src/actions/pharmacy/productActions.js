import {
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_FAILURE,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAILURE,
	PRODUCT_DELETE_ADMIN_REQUEST,
	PRODUCT_DELETE_ADMIN_SUCCESS,
	PRODUCT_DELETE_ADMIN_FAILURE,
	PRODUCT_CREATE_ADMIN_REQUEST,
	PRODUCT_CREATE_ADMIN_SUCCESS,
	PRODUCT_CREATE_ADMIN_FAILURE,
	PRODUCT_EDIT_ADMIN_REQUEST,
	PRODUCT_EDIT_ADMIN_SUCCESS,
	PRODUCT_EDIT_ADMIN_FAILURE,
	PRODUCT_CREATE_REVIEW_REQUEST,
	PRODUCT_CREATE_REVIEW_SUCCESS,
	PRODUCT_CREATE_REVIEW_FAILURE,
} from '../../constants/productConstants';
import axios from 'axios';

// action creator to get all products
const productList = () => async (dispatch) => {
	try {
		dispatch({
			type: PRODUCT_LIST_REQUEST,
		});
		const { data } = await axios.get('/api/products');
		dispatch({
			type: PRODUCT_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: PRODUCT_LIST_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

const singleProductDetails = (id) => async (dispatch) => {
	try {
		dispatch({
			type: PRODUCT_DETAILS_REQUEST,
		});
		const { data } = await axios.get(`/api/products/${id}`);
		dispatch({
			type: PRODUCT_DETAILS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: PRODUCT_DETAILS_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

const createProductReview =
	(productId, review) => async (dispatch, getState) => {
		try {
			dispatch({
				type: PRODUCT_CREATE_REVIEW_REQUEST,
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

			await axios.post(`/api/products/${productId}/reviews`, review, config);

			dispatch({
				type: PRODUCT_CREATE_REVIEW_SUCCESS,
			});
		} catch (error) {
			dispatch({
				type: PRODUCT_CREATE_REVIEW_FAILURE,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

// ADMIN USE

// CREATE new product -- ADMIN use
const createProduct = (product) => async (dispatch, getState) => {
	try {
		dispatch({
			type: PRODUCT_CREATE_ADMIN_REQUEST,
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

		const { data } = await axios.post('/api/products', product, config);

		dispatch({
			type: PRODUCT_CREATE_ADMIN_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: PRODUCT_CREATE_ADMIN_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

// EDIT product -- ADMIN use
const editProduct = (id, productDetails) => async (dispatch, getState) => {
	try {
		dispatch({
			type: PRODUCT_EDIT_ADMIN_REQUEST,
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

		const { data } = await axios.put(
			`/api/products/${id}`,
			productDetails,
			config
		);

		dispatch({
			type: PRODUCT_EDIT_ADMIN_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: PRODUCT_EDIT_ADMIN_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

// DELETE product -- ADMIN use
const deleteProduct = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: PRODUCT_DELETE_ADMIN_REQUEST,
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

		const { data } = await axios.delete(`/api/products/${id}`, config);

		dispatch({
			type: PRODUCT_DELETE_ADMIN_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: PRODUCT_DELETE_ADMIN_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export {
	productList,
	singleProductDetails,
	createProductReview,
	createProduct,
	editProduct,
	deleteProduct,
};
