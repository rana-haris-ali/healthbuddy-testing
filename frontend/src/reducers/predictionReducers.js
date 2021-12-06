import {
	DISEASE_PREDICTION_FAILURE,
	DISEASE_PREDICTION_REQUEST,
	DISEASE_PREDICTION_RESET,
	DISEASE_PREDICTION_SUCCESS,
	LUNGS_PREDICTION_FAILURE,
	LUNGS_PREDICTION_REQUEST,
	LUNGS_PREDICTION_RESET,
	LUNGS_PREDICTION_SUCCESS,
} from '../constants/predictionConstants';

const lungsPredictionReducer = (state = {}, action) => {
	switch (action.type) {
		case LUNGS_PREDICTION_REQUEST:
			return { loading: true };
		case LUNGS_PREDICTION_SUCCESS:
			return { loading: false, success: true, response: action.payload };
		case LUNGS_PREDICTION_FAILURE:
			return { loading: false, error: action.payload };
		case LUNGS_PREDICTION_RESET:
			return {};
		default:
			return state;
	}
};

const diseasePredictionReducer = (state = {}, action) => {
	switch (action.type) {
		case DISEASE_PREDICTION_REQUEST:
			return { loading: true };
		case DISEASE_PREDICTION_SUCCESS:
			return { loading: false, success: true, result: action.payload.result };
		case DISEASE_PREDICTION_FAILURE:
			return { loading: false, error: action.payload };
		case DISEASE_PREDICTION_RESET:
			return {};
		default:
			return state;
	}
};

export { lungsPredictionReducer, diseasePredictionReducer };
