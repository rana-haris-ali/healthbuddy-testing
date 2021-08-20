import axios from 'axios';
import {
	DOCTORS_LIST_FAILURE,
	DOCTORS_LIST_REQUEST,
	DOCTORS_LIST_SUCCESS,
} from '../constants/doctorConstants';

const getDoctorsList = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: DOCTORS_LIST_REQUEST,
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

		const { data } = await axios.get('/api/doctors/', config);

		dispatch({
			type: DOCTORS_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: DOCTORS_LIST_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export { getDoctorsList };
