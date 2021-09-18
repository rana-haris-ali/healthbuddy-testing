import axios from 'axios';
import { USER_LOGIN_SUCCESS } from '../constants/userConstants';
import {
	PATIENT_GET_ALL_REQUESTS_FAILURE,
	PATIENT_GET_ALL_REQUESTS_REQUEST,
	PATIENT_GET_ALL_REQUESTS_SUCCESS,
	REGISTER_PATIENT_FAILURE,
	REGISTER_PATIENT_REQUEST,
	REGISTER_PATIENT_SUCCESS,
	REQUEST_DOCTOR_CONTACT_FAILURE,
	REQUEST_DOCTOR_CONTACT_REQUEST,
	REQUEST_DOCTOR_CONTACT_SUCCESS,
} from '../constants/patientConstants';

const registerPatient = (patientDetails) => async (dispatch, getState) => {
	try {
		dispatch({
			type: REGISTER_PATIENT_REQUEST,
		});

		const { data } = await axios.post('/api/patients', patientDetails);

		dispatch({
			type: REGISTER_PATIENT_SUCCESS,
		});

		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data,
		});

		localStorage.setItem('userInfo', JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: REGISTER_PATIENT_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

// get all requests made by a patient
const patientGetAllRequests = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: PATIENT_GET_ALL_REQUESTS_REQUEST,
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

		const { data } = await axios.get('/api/patients/requests', config);

		dispatch({
			type: PATIENT_GET_ALL_REQUESTS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: PATIENT_GET_ALL_REQUESTS_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

const requestDoctorContact = (doctorId) => async (dispatch, getState) => {
	try {
		dispatch({
			type: REQUEST_DOCTOR_CONTACT_REQUEST,
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

		await axios.get(`/api/doctors/${doctorId}/request`, config);

		dispatch({
			type: REQUEST_DOCTOR_CONTACT_SUCCESS,
		});
	} catch (error) {
		dispatch({
			type: REQUEST_DOCTOR_CONTACT_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export { registerPatient, requestDoctorContact, patientGetAllRequests };
