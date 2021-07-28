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
	PRODUCT_DELETE_ADMIN_RESET,
} from '../../constants/productConstants';

// reducer to get full list of products
const productListReducer = (state = { products: [] }, action) => {
	switch (action.type) {
		case PRODUCT_LIST_REQUEST:
			return { loading: true };
		case PRODUCT_LIST_SUCCESS:
			return { loading: false, products: action.payload };
		case PRODUCT_LIST_FAILURE:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

const productDetailsReducer = (
	state = { product: { reviews: [] } },
	action
) => {
	switch (action.type) {
		case PRODUCT_DETAILS_REQUEST:
			return { loading: true };
		case PRODUCT_DETAILS_SUCCESS:
			return { loading: false, product: action.payload };
		case PRODUCT_DETAILS_FAILURE:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

// ADMIN USE

// reducer for deleting product
const productDeleteAdminReducer = (state = {}, action) => {
	switch (action.type) {
		case PRODUCT_DELETE_ADMIN_REQUEST:
			return { loading: true };
		case PRODUCT_DELETE_ADMIN_SUCCESS:
			return { loading: false, success: true };
		case PRODUCT_DELETE_ADMIN_FAILURE:
			return { loading: false, error: action.payload };
		case PRODUCT_DELETE_ADMIN_RESET:
			return {};
		default:
			return state;
	}
};

export { productListReducer, productDetailsReducer, productDeleteAdminReducer };
