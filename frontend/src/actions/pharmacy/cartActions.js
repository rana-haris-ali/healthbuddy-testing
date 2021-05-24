import axios from 'axios';
import {
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	CART_GET_SHIPPING_ADDRESS_REQUEST,
	CART_GET_SHIPPING_ADDRESS_SUCCESS,
	CART_GET_SHIPPING_ADDRESS_FAILURE,
} from '../../constants/cartConstants';

const addToCart = (id, qty) => async (dispatch, getState) => {
	const { data } = await axios.get(`/api/products/${id}`);
	dispatch({
		type: CART_ADD_ITEM,
		payload: {
			productId: data._id,
			name: data.name,
			image: data.image,
			price: data.price,
			countInStock: data.countInStock,
			qty,
		},
	});
	localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

const removeFromCart = (id) => async (dispatch, getState) => {
	dispatch({
		type: CART_REMOVE_ITEM,
		payload: id,
	});
	localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

const getShippingAddress = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: CART_GET_SHIPPING_ADDRESS_REQUEST,
		});

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

		const { data } = await axios.get(`/api/users/shipping`, config);

		dispatch({
			type: CART_GET_SHIPPING_ADDRESS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: CART_GET_SHIPPING_ADDRESS_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export { addToCart, removeFromCart, getShippingAddress };
