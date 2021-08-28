import axios from 'axios';
import {
	PATIENT_GET_ALL_REQUESTS_FAILURE,
	PATIENT_GET_ALL_REQUESTS_REQUEST,
	PATIENT_GET_ALL_REQUESTS_SUCCESS,
	REQUEST_DOCTOR_CONTACT_FAILURE,
	REQUEST_DOCTOR_CONTACT_REQUEST,
	REQUEST_DOCTOR_CONTACT_SUCCESS,
} from '../constants/patientConstants';

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

export { requestDoctorContact, patientGetAllRequests };
