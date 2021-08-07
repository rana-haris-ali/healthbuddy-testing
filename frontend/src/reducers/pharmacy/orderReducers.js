import {
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_CREATE_FAILURE,
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS,
	ORDER_DETAILS_FAILURE,
	ORDER_PAY_RESET,
	ORDER_PAY_FAILURE,
	ORDER_PAY_SUCCESS,
	ORDER_PAY_REQUEST,
	MY_ORDERS_LIST_REQUEST,
	MY_ORDERS_LIST_SUCCESS,
	MY_ORDERS_LIST_FAILURE,
	MY_ORDERS_LIST_RESET,
	GET_ALL_ORDERS_ADMIN_REQUEST,
	GET_ALL_ORDERS_ADMIN_SUCCESS,
	GET_ALL_ORDERS_ADMIN_FAILURE,
	ORDER_DELIVER_REQUEST,
	ORDER_DELIVER_SUCCESS,
	ORDER_DELIVER_FAILURE,
	ORDER_DELIVER_RESET,
} from '../../constants/orderConstants';

const orderCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case ORDER_CREATE_REQUEST:
			return { loading: true };
		case ORDER_CREATE_SUCCESS:
			return { loading: false, success: true, order: action.payload };
		case ORDER_CREATE_FAILURE:
			return { loading: false, success: false, error: action.payload };
		default:
			return state;
	}
};

const orderDetailsReducer = (
	state = { loading: true, orderItems: [], shippingAddress: {} },
	action
) => {
	switch (action.type) {
		case ORDER_DETAILS_REQUEST:
			return { ...state, loading: true };
		case ORDER_DETAILS_SUCCESS:
			return { loading: false, order: action.payload };
		case ORDER_DETAILS_FAILURE:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

const myOrdersListReducer = (state = { orders: [] }, action) => {
	switch (action.type) {
		case MY_ORDERS_LIST_REQUEST:
			return { loading: true };
		case MY_ORDERS_LIST_SUCCESS:
			return { loading: false, orders: action.payload };
		case MY_ORDERS_LIST_FAILURE:
			return { loading: false, error: action.payload };
		case MY_ORDERS_LIST_RESET:
			// empty myOrdersList at user_logout
			return { orders: [] };
		default:
			return state;
	}
};

const orderPayReducer = (state = {}, action) => {
	switch (action.type) {
		case ORDER_PAY_REQUEST:
			return { loading: true };
		case ORDER_PAY_SUCCESS:
			return { loading: false, success: true };
		case ORDER_PAY_FAILURE:
			return { loading: false, error: action.payload };
		case ORDER_PAY_RESET:
			return {};
		default:
			return state;
	}
};

const orderDeliverReducer = (state = {}, action) => {
	switch (action.type) {
		case ORDER_DELIVER_REQUEST:
			return { loading: true };
		case ORDER_DELIVER_SUCCESS:
			return { loading: false, success: true };
		case ORDER_DELIVER_FAILURE:
			return { loading: false, error: action.payload };
		case ORDER_DELIVER_RESET:
			return {};
		default:
			return state;
	}
};

const getOrdersAdminReducer = (state = { orders: [] }, action) => {
	switch (action.type) {
		case GET_ALL_ORDERS_ADMIN_REQUEST:
			return { loading: true };
		case GET_ALL_ORDERS_ADMIN_SUCCESS:
			return { loading: false, orders: action.payload };
		case GET_ALL_ORDERS_ADMIN_FAILURE:
			return { loading: false, error: action.payload };
		// case GET_ALL_ORDERS_ADMIN_RESET:
		// 	return {};
		default:
			return state;
	}
};

export {
	orderCreateReducer,
	orderDetailsReducer,
	orderPayReducer,
	orderDeliverReducer,
	myOrdersListReducer,
	getOrdersAdminReducer,
};
