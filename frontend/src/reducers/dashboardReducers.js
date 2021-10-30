import {
	GET_DASHBOARD_DATA_FAILURE,
	GET_DASHBOARD_DATA_REQUEST,
	GET_DASHBOARD_DATA_SUCCESS,
} from '../constants/dashboardConstants';

const dashboardDataReducer = (state = {}, action) => {
	switch (action.type) {
		case GET_DASHBOARD_DATA_REQUEST:
			return { loading: true };
		case GET_DASHBOARD_DATA_SUCCESS:
			return { loading: false, dashboardData: action.payload };
		case GET_DASHBOARD_DATA_FAILURE:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export { dashboardDataReducer };
