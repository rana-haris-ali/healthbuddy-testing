import {
	DOCTORS_LIST_FAILURE,
	DOCTORS_LIST_REQUEST,
	DOCTORS_LIST_SUCCESS,
	GET_SINGLE_DOCTOR_FAILURE,
	GET_SINGLE_DOCTOR_REQUEST,
	GET_SINGLE_DOCTOR_SUCCESS,
	PATIENTS_LIST_FAILURE,
	PATIENTS_LIST_REQUEST,
	PATIENTS_LIST_SUCCESS,
	PATIENT_REQUEST_ACCEPTANCE_FAILURE,
	PATIENT_REQUEST_ACCEPTANCE_REQUEST,
	PATIENT_REQUEST_ACCEPTANCE_RESET,
	PATIENT_REQUEST_ACCEPTANCE_SUCCESS,
} from '../constants/doctorConstants';

const doctorsListReducer = (state = { doctors: [] }, action) => {
	switch (action.type) {
		case DOCTORS_LIST_REQUEST:
			return { ...state, loading: true };
		case DOCTORS_LIST_SUCCESS:
			return { ...state, loading: false, doctors: action.payload };
		case DOCTORS_LIST_FAILURE:
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
};

const doctorDetailsReducer = (state = {}, action) => {
	switch (action.type) {
		case GET_SINGLE_DOCTOR_REQUEST:
			return { loading: true };
		case GET_SINGLE_DOCTOR_SUCCESS:
			return { loading: false, doctorDetails: action.payload };
		case GET_SINGLE_DOCTOR_FAILURE:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

const patientsListReducer = (
	state = { patientRequests: [], acceptedPatients: [] },
	action
) => {
	switch (action.type) {
		case PATIENTS_LIST_REQUEST:
			return { ...state, loading: true };
		case PATIENTS_LIST_SUCCESS:
			return {
				...state,
				loading: false,
				patientRequests: action.payload.patientRequests,
				acceptedPatients: action.payload.acceptedPatients,
			};
		case PATIENTS_LIST_FAILURE:
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
};

const acceptPatientRequestReducer = (state = {}, action) => {
	switch (action.type) {
		case PATIENT_REQUEST_ACCEPTANCE_REQUEST:
			return { loading: true };
		case PATIENT_REQUEST_ACCEPTANCE_SUCCESS:
			return { loading: false, success: true };
		case PATIENT_REQUEST_ACCEPTANCE_FAILURE:
			return { loading: false, error: action.payload };
		case PATIENT_REQUEST_ACCEPTANCE_RESET:
			return {};
		default:
			return state;
	}
};

export {
	doctorsListReducer,
	doctorDetailsReducer,
	patientsListReducer,
	acceptPatientRequestReducer,
};
