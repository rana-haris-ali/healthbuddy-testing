import {
	DOCTORS_LIST_FAILURE,
	DOCTORS_LIST_REQUEST,
	DOCTORS_LIST_SUCCESS,
	GET_DOCTOR_PROFESSIONAL_INFO_FAILURE,
	GET_DOCTOR_PROFESSIONAL_INFO_REQUEST,
	GET_DOCTOR_PROFESSIONAL_INFO_RESET,
	GET_DOCTOR_PROFESSIONAL_INFO_SUCCESS,
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
	REGISTER_DOCTOR_FAILURE,
	REGISTER_DOCTOR_REQUEST,
	REGISTER_DOCTOR_SUCCESS,
	UPDATE_DOCTOR_PROFESSIONAL_INFO_FAILURE,
	UPDATE_DOCTOR_PROFESSIONAL_INFO_REQUEST,
	UPDATE_DOCTOR_PROFESSIONAL_INFO_RESET,
	UPDATE_DOCTOR_PROFESSIONAL_INFO_SUCCESS,
} from '../constants/doctorConstants';

const registerDoctorReducer = (state = {}, action) => {
	switch (action.type) {
		case REGISTER_DOCTOR_REQUEST:
			return { loading: true };
		case REGISTER_DOCTOR_SUCCESS:
			return { loading: false, success: true };
		case REGISTER_DOCTOR_FAILURE:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

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
	state = { pendingPatientRequests: [], acceptedPatientRequests: [] },
	action
) => {
	switch (action.type) {
		case PATIENTS_LIST_REQUEST:
			return { ...state, loading: true };
		case PATIENTS_LIST_SUCCESS:
			return {
				...state,
				loading: false,
				pendingPatientRequests: action.payload.pendingPatientRequests,
				acceptedPatientRequests: action.payload.acceptedPatientRequests,
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

// reducer for getting doctor's professional info (for profile screen)
const getProfessionalInfoReducer = (state = {}, action) => {
	switch (action.type) {
		case GET_DOCTOR_PROFESSIONAL_INFO_REQUEST:
			return { loading: true };
		case GET_DOCTOR_PROFESSIONAL_INFO_SUCCESS:
			return { loading: false, professionalInfo: action.payload };
		case GET_DOCTOR_PROFESSIONAL_INFO_FAILURE:
			return { loading: false, error: action.payload };
		case GET_DOCTOR_PROFESSIONAL_INFO_RESET:
			return {};
		default:
			return state;
	}
};

// reducer for updating doctor's professional info (for profile screen)
const updateProfessionalInfoReducer = (state = {}, action) => {
	switch (action.type) {
		case UPDATE_DOCTOR_PROFESSIONAL_INFO_REQUEST:
			return { loading: true };
		case UPDATE_DOCTOR_PROFESSIONAL_INFO_SUCCESS:
			return { loading: false, success: true };
		case UPDATE_DOCTOR_PROFESSIONAL_INFO_FAILURE:
			return { loading: false, error: action.payload };
		case UPDATE_DOCTOR_PROFESSIONAL_INFO_RESET:
			return {};
		default:
			return state;
	}
};

export {
	registerDoctorReducer,
	doctorsListReducer,
	doctorDetailsReducer,
	patientsListReducer,
	acceptPatientRequestReducer,
	getProfessionalInfoReducer,
	updateProfessionalInfoReducer,
};
