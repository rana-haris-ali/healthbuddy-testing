import {
	DOCTORS_LIST_FAILURE,
	DOCTORS_LIST_REQUEST,
	DOCTORS_LIST_SUCCESS,
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

export { doctorsListReducer };
