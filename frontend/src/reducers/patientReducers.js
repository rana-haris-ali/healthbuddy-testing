import {
	PATIENT_GET_ALL_REQUESTS_FAILURE,
	PATIENT_GET_ALL_REQUESTS_REQUEST,
	PATIENT_GET_ALL_REQUESTS_RESET,
	PATIENT_GET_ALL_REQUESTS_SUCCESS,
	REQUEST_DOCTOR_CONTACT_FAILURE,
	REQUEST_DOCTOR_CONTACT_REQUEST,
	REQUEST_DOCTOR_CONTACT_RESET,
	REQUEST_DOCTOR_CONTACT_SUCCESS,
} from '../constants/patientConstants';

// reducer for getting all requests made by a patient
const patientAllRequestsReducer = (state = { requests: [] }, action) => {
	switch (action.type) {
		case PATIENT_GET_ALL_REQUESTS_REQUEST:
			return { ...state, loading: true };
		case PATIENT_GET_ALL_REQUESTS_SUCCESS:
			return { ...state, loading: false, requests: action.payload };
		case PATIENT_GET_ALL_REQUESTS_FAILURE:
			return { ...state, loading: false, error: action.payload };
		case PATIENT_GET_ALL_REQUESTS_RESET:
			return { requests: [] };
		default:
			return state;
	}
};

const requestDoctorContactReducer = (state = {}, action) => {
	switch (action.type) {
		case REQUEST_DOCTOR_CONTACT_REQUEST:
			return { loading: true };
		case REQUEST_DOCTOR_CONTACT_SUCCESS:
			return { loading: false, success: true };
		case REQUEST_DOCTOR_CONTACT_FAILURE:
			return { loading: false, error: action.payload };
		case REQUEST_DOCTOR_CONTACT_RESET:
			return {};
		default:
			return state;
	}
};

export { requestDoctorContactReducer, patientAllRequestsReducer };