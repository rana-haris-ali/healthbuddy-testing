import {
	DOCTORS_LIST_FAILURE,
	DOCTORS_LIST_REQUEST,
	DOCTORS_LIST_SUCCESS,
	GET_SINGLE_DOCTOR_FAILURE,
	GET_SINGLE_DOCTOR_REQUEST,
	GET_SINGLE_DOCTOR_SUCCESS,
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

export { doctorsListReducer, doctorDetailsReducer };
