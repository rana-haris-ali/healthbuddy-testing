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
	PRODUCT_CREATE_ADMIN_REQUEST,
	PRODUCT_CREATE_ADMIN_SUCCESS,
	PRODUCT_CREATE_ADMIN_FAILURE,
	PRODUCT_CREATE_ADMIN_RESET,
	PRODUCT_DETAILS_RESET,
	PRODUCT_EDIT_ADMIN_REQUEST,
	PRODUCT_EDIT_ADMIN_SUCCESS,
	PRODUCT_EDIT_ADMIN_FAILURE,
	PRODUCT_EDIT_ADMIN_RESET,
	PRODUCT_CREATE_REVIEW_REQUEST,
	PRODUCT_CREATE_REVIEW_SUCCESS,
	PRODUCT_CREATE_REVIEW_FAILURE,
	PRODUCT_CREATE_REVIEW_RESET,
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
		case PRODUCT_DETAILS_RESET:
			return {};
		default:
			return state;
	}
};

const productCreateReviewReducer = (state = {}, action) => {
	switch (action.type) {
		case PRODUCT_CREATE_REVIEW_REQUEST:
			return { loading: true };
		case PRODUCT_CREATE_REVIEW_SUCCESS:
			return { loading: false, success: true };
		case PRODUCT_CREATE_REVIEW_FAILURE:
			return { loading: false, error: action.payload };
		case PRODUCT_CREATE_REVIEW_RESET:
			return {};
		default:
			return state;
	}
};

// ADMIN USE

// product CREATE reducer
const productCreateAdminReducer = (state = {}, action) => {
	switch (action.type) {
		case PRODUCT_CREATE_ADMIN_REQUEST:
			return { loading: true };
		case PRODUCT_CREATE_ADMIN_SUCCESS:
			return { loading: false, success: true, product: action.payload };
		case PRODUCT_CREATE_ADMIN_FAILURE:
			return { loading: false, error: action.payload };
		case PRODUCT_CREATE_ADMIN_RESET:
			return {};
		default:
			return state;
	}
};

// product EDIT reducer
const productEditAdminReducer = (state = {}, action) => {
	switch (action.type) {
		case PRODUCT_EDIT_ADMIN_REQUEST:
			return { loading: true };
		case PRODUCT_EDIT_ADMIN_SUCCESS:
			return { loading: false, success: true, updatedProduct: action.payload };
		case PRODUCT_EDIT_ADMIN_FAILURE:
			return { loading: false, error: action.payload };
		case PRODUCT_EDIT_ADMIN_RESET:
			return {};
		default:
			return state;
	}
};

// product DELETE reducer
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

export {
	productListReducer,
	productDetailsReducer,
	productCreateReviewReducer,
	productCreateAdminReducer,
	productEditAdminReducer,
	productDeleteAdminReducer,
};
