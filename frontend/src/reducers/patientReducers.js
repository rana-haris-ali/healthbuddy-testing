import {
	REQUEST_DOCTOR_CONTACT_FAILURE,
	REQUEST_DOCTOR_CONTACT_REQUEST,
	REQUEST_DOCTOR_CONTACT_RESET,
	REQUEST_DOCTOR_CONTACT_SUCCESS,
} from '../constants/patientConstants';

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

export { requestDoctorContactReducer };
