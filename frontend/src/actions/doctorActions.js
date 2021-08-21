import axios from 'axios';
import {
	DOCTORS_LIST_FAILURE,
	DOCTORS_LIST_REQUEST,
	DOCTORS_LIST_SUCCESS,
	GET_SINGLE_DOCTOR_FAILURE,
	GET_SINGLE_DOCTOR_REQUEST,
	GET_SINGLE_DOCTOR_SUCCESS,
} from '../constants/doctorConstants';

const getDoctorsList = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: DOCTORS_LIST_REQUEST,
		});

		const config = {
			headers: {
				'Content-Type': 'application/json',
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

const getSingleDoctor = (doctorId) => async (dispatch, getState) => {
	try {
		dispatch({
			type: GET_SINGLE_DOCTOR_REQUEST,
		});

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const { data } = await axios.get(`/api/doctors/${doctorId}`, config);

		dispatch({
			type: GET_SINGLE_DOCTOR_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: GET_SINGLE_DOCTOR_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export { getDoctorsList, getSingleDoctor };
