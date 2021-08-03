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
	ALL_USERS_LIST_ADMIN_REQUEST,
	ALL_USERS_LIST_ADMIN_SUCCESS,
	ALL_USERS_LIST_ADMIN_FAILURE,
	ALL_USERS_LIST_ADMIN_RESET,
	DELETE_USER_ADMIN_REQUEST,
	DELETE_USER_ADMIN_SUCCESS,
	DELETE_USER_ADMIN_FAILURE,
	EDIT_USER_ADMIN_REQUEST,
	EDIT_USER_ADMIN_SUCCESS,
	EDIT_USER_ADMIN_FAILURE,
	GET_SINGLE_USER_ADMIN_REQUEST,
	GET_SINGLE_USER_ADMIN_SUCCESS,
	GET_SINGLE_USER_ADMIN_FAILURE,
	EDIT_USER_ADMIN_RESET,
	DELETE_USER_ADMIN_RESET,
} from '../../constants/userConstants';

const userLoginReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_LOGIN_REQUEST:
			return { loading: true };
		case USER_LOGIN_SUCCESS:
			return { loading: false, userInfo: action.payload };
		case USER_LOGIN_FAILURE:
			return { loading: false, error: action.payload };
		case USER_LOGOUT:
			return {};
		default:
			return state;
	}
};

const userRegisterReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_REGISTER_REQUEST:
			return { loading: true };
		case USER_REGISTER_SUCCESS:
			return { loading: false, userInfo: action.payload };
		case USER_REGISTER_FAILURE:
			return { loading: false, error: action.payload };
		case USER_LOGOUT:
			// empty userInfo at user_logout
			return {};
		default:
			return state;
	}
};

const userDetailsReducer = (state = { user: {} }, action) => {
	switch (action.type) {
		case USER_DETAILS_REQUEST:
			return { ...state, loading: true };
		case USER_DETAILS_SUCCESS:
			return { ...state, loading: false, user: action.payload };
		case USER_DETAILS_FAILURE:
			return { ...state, loading: false, error: action.payload };
		case USER_DETAILS_RESET:
			// empty userDetails at user_logout
			return { user: {} };
		default:
			return state;
	}
};

const userUpdateProfileReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_UPDATE_PROFILE_REQUEST:
			return { loading: true };
		case USER_UPDATE_PROFILE_SUCCESS:
			return { loading: false, success: true, userInfo: action.payload };
		case USER_UPDATE_PROFILE_FAILURE:
			return { loading: false, error: action.payload };
		case USER_LOGOUT:
			// empty userInfo at user_logout
			return { userInfo: {} };
		default:
			return state;
	}
};

const userDetailsAdminReducer = (state = { user: {} }, action) => {
	switch (action.type) {
		case GET_SINGLE_USER_ADMIN_REQUEST:
			return { ...state, loading: true };
		case GET_SINGLE_USER_ADMIN_SUCCESS:
			return { ...state, loading: false, user: action.payload };
		case GET_SINGLE_USER_ADMIN_FAILURE:
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
};

const userEditAdminReducer = (state = {}, action) => {
	switch (action.type) {
		case EDIT_USER_ADMIN_REQUEST:
			return { loading: true };
		case EDIT_USER_ADMIN_SUCCESS:
			return { loading: false, success: true, updatedUser: action.payload };
		case EDIT_USER_ADMIN_FAILURE:
			return { loading: false, error: action.payload };
		case EDIT_USER_ADMIN_RESET:
			return {};
		default:
			return state;
	}
};

const userDeleteAdminReducer = (state = {}, action) => {
	switch (action.type) {
		case DELETE_USER_ADMIN_REQUEST:
			return { loading: true };
		case DELETE_USER_ADMIN_SUCCESS:
			return { loading: false, success: true };
		case DELETE_USER_ADMIN_FAILURE:
			return { loading: false, error: action.payload };
		case DELETE_USER_ADMIN_RESET:
			return {};
		default:
			return state;
	}
};

// all users list for admin use
const userListAdminReducer = (state = { users: [] }, action) => {
	switch (action.type) {
		case ALL_USERS_LIST_ADMIN_REQUEST:
			return { loading: true };
		case ALL_USERS_LIST_ADMIN_SUCCESS:
			return { loading: false, users: action.payload };
		case ALL_USERS_LIST_ADMIN_FAILURE:
			return { loading: false, error: action.payload };
		case ALL_USERS_LIST_ADMIN_RESET:
			// empty userList at admin_logout
			return { users: [] };
		default:
			return state;
	}
};

export {
	userLoginReducer,
	userRegisterReducer,
	userDetailsReducer,
	userUpdateProfileReducer,
	// ADMIN
	userDetailsAdminReducer,
	userEditAdminReducer,
	userDeleteAdminReducer,
	userListAdminReducer,
};
