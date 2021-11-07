import axios from 'axios';
import { USER_LOGIN_SUCCESS } from '../constants/userConstants';
import {
	GET_ACCEPTED_DOCTORS_FAILURE,
	GET_ACCEPTED_DOCTORS_REQUEST,
	GET_ACCEPTED_DOCTORS_SUCCESS,
	GET_MEDICAL_INFO_FAILURE,
	GET_MEDICAL_INFO_REQUEST,
	GET_MEDICAL_INFO_SUCCESS,
	PATIENT_GET_ALL_REQUESTS_FAILURE,
	PATIENT_GET_ALL_REQUESTS_REQUEST,
	PATIENT_GET_ALL_REQUESTS_SUCCESS,
	REGISTER_PATIENT_FAILURE,
	REGISTER_PATIENT_REQUEST,
	REGISTER_PATIENT_SUCCESS,
	REQUEST_DOCTOR_CONTACT_FAILURE,
	REQUEST_DOCTOR_CONTACT_REQUEST,
	REQUEST_DOCTOR_CONTACT_SUCCESS,
	UPDATE_MEDICAL_INFO_FAILURE,
	UPDATE_MEDICAL_INFO_REQUEST,
	UPDATE_MEDICAL_INFO_SUCCESS,
} from '../constants/patientConstants';

import {
	CREATE_NEW_CONVERSATION_FAILURE,
	CREATE_NEW_CONVERSATION_REQUEST,
	CREATE_NEW_CONVERSATION_SUCCESS,
} from '../constants/chatConstants';

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

const getAcceptedDoctors = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: GET_ACCEPTED_DOCTORS_REQUEST,
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

		const { data } = await axios.get('/api/patients/doctors/accepted', config);

		dispatch({
			type: GET_ACCEPTED_DOCTORS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: GET_ACCEPTED_DOCTORS_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

const getMedicalInfo = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: GET_MEDICAL_INFO_REQUEST,
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

		const { data } = await axios.get('/api/patients/medical-info', config);

		dispatch({
			type: GET_MEDICAL_INFO_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: GET_MEDICAL_INFO_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

const updateMedicalInfo = (medicalInfo) => async (dispatch, getState) => {
	try {
		dispatch({
			type: UPDATE_MEDICAL_INFO_REQUEST,
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

		await axios.put('/api/patients/medical-info', medicalInfo, config);

		dispatch({
			type: UPDATE_MEDICAL_INFO_SUCCESS,
		});

		dispatch(getMedicalInfo());
	} catch (error) {
		dispatch({
			type: UPDATE_MEDICAL_INFO_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

const createNewConversation = (doctorId) => async (dispatch, getState) => {
	try {
		dispatch({
			type: CREATE_NEW_CONVERSATION_REQUEST,
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

		await axios.post(`/api/chat/conversations/${doctorId}`, {}, config);

		// console.log(data);

		dispatch({
			type: CREATE_NEW_CONVERSATION_SUCCESS,
		});
	} catch (error) {
		// console.log(error);
		dispatch({
			type: CREATE_NEW_CONVERSATION_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export {
	registerPatient,
	requestDoctorContact,
	patientGetAllRequests,
	getAcceptedDoctors,
	getMedicalInfo,
	updateMedicalInfo,
	createNewConversation,
};
