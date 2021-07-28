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

// ADMIN USE

// delete product -- ADMIN use
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

export { productList, singleProductDetails, deleteProduct };
