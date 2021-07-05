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

// all users list for admin use
const userListReducer = (state = { users: [] }, action) => {
	switch (action.type) {
		case ADMIN_ALL_USERS_LIST_REQUEST:
			return { loading: true };
		case ADMIN_ALL_USERS_LIST_SUCCESS:
			return { loading: false, users: action.payload };
		case ADMIN_ALL_USERS_LIST_FAILURE:
			return { loading: false, error: action.payload };
		case ADMIN_ALL_USERS_LIST_RESET:
			// empty userList at admin_logout
			return { users: [] };
		default:
			return state;
	}
};

const userDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case ADMIN_DELETE_USER_REQUEST:
			return { loading: true };
		case ADMIN_DELETE_USER_SUCCESS:
			return { loading: false, success: true };
		case ADMIN_DELETE_USER_FAILURE:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export {
	userLoginReducer,
	userRegisterReducer,
	userDetailsReducer,
	userUpdateProfileReducer,
	userListReducer,
	userDeleteReducer,
};
