import axios from 'axios';
import {
	LUNGS_PREDICTION_REQUEST,
	LUNGS_PREDICTION_SUCCESS,
	LUNGS_PREDICTION_FAILURE,
	DISEASE_PREDICTION_REQUEST,
	DISEASE_PREDICTION_SUCCESS,
	DISEASE_PREDICTION_FAILURE,
} from '../constants/predictionConstants';

const lungsPrediction = (imagePath) => async (dispatch, getState) => {
	try {
		dispatch({
			type: LUNGS_PREDICTION_REQUEST,
		});

		// get token from state
		// const {
		// 	userLogin: {
		// 		userInfo: { token },
		// 	},
		// } = getState();

		const config = {
			headers: {
				// Authorization: `Bearer ${token}`,
			},
		};

		const { data } = await axios.post(
			'http://127.0.0.1:7000/predict',
			{ imagePath: `O:/healthBuddy-testing${imagePath}` },
			config
		);

		dispatch({
			type: LUNGS_PREDICTION_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: LUNGS_PREDICTION_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

const diseasePrediction = (patient_symptoms) => async (dispatch, getState) => {
	try {
		dispatch({
			type: DISEASE_PREDICTION_REQUEST,
		});

		const config = {
			headers: {
				// Authorization: `Bearer ${token}`,
			},
		};

		const { data } = await axios.post(
			'http://127.0.0.1:7000/disease-prediction',
			{ patient_symptoms },
			config
		);

		dispatch({
			type: DISEASE_PREDICTION_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: DISEASE_PREDICTION_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export { lungsPrediction, diseasePrediction };
