import axios from 'axios';
import {
	GET_DASHBOARD_DATA_FAILURE,
	GET_DASHBOARD_DATA_REQUEST,
	GET_DASHBOARD_DATA_SUCCESS,
} from '../constants/dashboardConstants';

const getDashboardData = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: GET_DASHBOARD_DATA_REQUEST,
		});

		const dashboardData = {
			totalPatients: (await axios.get('/api/patients/number')).data,
			totalDoctors: (await axios.get('/api/doctors/number')).data,
		};

		dispatch({
			type: GET_DASHBOARD_DATA_SUCCESS,
			payload: dashboardData,
		});
	} catch (error) {
		dispatch({
			type: GET_DASHBOARD_DATA_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export { getDashboardData };
