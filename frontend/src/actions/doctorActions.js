import axios from 'axios';
import {
	DOCTORS_LIST_FAILURE,
	DOCTORS_LIST_REQUEST,
	DOCTORS_LIST_SUCCESS,
	GET_DOCTOR_PROFESSIONAL_INFO_FAILURE,
	GET_DOCTOR_PROFESSIONAL_INFO_REQUEST,
	GET_DOCTOR_PROFESSIONAL_INFO_SUCCESS,
	GET_SINGLE_DOCTOR_FAILURE,
	GET_SINGLE_DOCTOR_REQUEST,
	GET_SINGLE_DOCTOR_SUCCESS,
	PATIENTS_LIST_FAILURE,
	PATIENTS_LIST_REQUEST,
	PATIENTS_LIST_SUCCESS,
	PATIENT_REQUEST_ACCEPTANCE_FAILURE,
	PATIENT_REQUEST_ACCEPTANCE_REQUEST,
	PATIENT_REQUEST_ACCEPTANCE_SUCCESS,
	REGISTER_DOCTOR_FAILURE,
	REGISTER_DOCTOR_REQUEST,
	REGISTER_DOCTOR_SUCCESS,
	UPDATE_DOCTOR_PROFESSIONAL_INFO_FAILURE,
	UPDATE_DOCTOR_PROFESSIONAL_INFO_REQUEST,
	UPDATE_DOCTOR_PROFESSIONAL_INFO_SUCCESS,
} from '../constants/doctorConstants';
import { USER_LOGIN_SUCCESS } from '../constants/userConstants';

const registerDoctor = (doctorDetails) => async (dispatch, getState) => {
	try {
		dispatch({
			type: REGISTER_DOCTOR_REQUEST,
		});

		const { data } = await axios.post('/api/doctors', doctorDetails);

		dispatch({
			type: REGISTER_DOCTOR_SUCCESS,
		});

		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data,
		});

		localStorage.setItem('userInfo', JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: REGISTER_DOCTOR_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

const getDoctorsList = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: DOCTORS_LIST_REQUEST,
		});

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const { data } = await axios.get('/api/doctors/', config);

		dispatch({
			type: DOCTORS_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: DOCTORS_LIST_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

const getSingleDoctor = (doctorId) => async (dispatch, getState) => {
	try {
		dispatch({
			type: GET_SINGLE_DOCTOR_REQUEST,
		});

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const { data } = await axios.get(`/api/doctors/${doctorId}`, config);

		dispatch({
			type: GET_SINGLE_DOCTOR_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: GET_SINGLE_DOCTOR_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

const getPatientsList = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: PATIENTS_LIST_REQUEST,
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

		const { data } = await axios.get('/api/doctors/all-patients', config);

		dispatch({
			type: PATIENTS_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: PATIENTS_LIST_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

const acceptPatientRequest = (patientId) => async (dispatch, getState) => {
	try {
		dispatch({
			type: PATIENT_REQUEST_ACCEPTANCE_REQUEST,
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

		await axios.get(`/api/patients/requests/${patientId}/approve`, config);

		dispatch({
			type: PATIENT_REQUEST_ACCEPTANCE_SUCCESS,
		});
	} catch (error) {
		dispatch({
			type: PATIENT_REQUEST_ACCEPTANCE_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

// get doctor's professional info for profile screen
const getDoctorProfessionalInfo = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: GET_DOCTOR_PROFESSIONAL_INFO_REQUEST,
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

		const { data } = await axios.get('/api/doctors/professional-info', config);

		dispatch({
			type: GET_DOCTOR_PROFESSIONAL_INFO_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: GET_DOCTOR_PROFESSIONAL_INFO_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

// update doctor's professional info (for profile screen)
const updateDoctorProfessionalInfo =
	(professionalInfo) => async (dispatch, getState) => {
		try {
			dispatch({
				type: UPDATE_DOCTOR_PROFESSIONAL_INFO_REQUEST,
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

			await axios.put(
				'/api/doctors/professional-info',
				professionalInfo,
				config
			);

			dispatch({
				type: UPDATE_DOCTOR_PROFESSIONAL_INFO_SUCCESS,
			});

			dispatch(getDoctorProfessionalInfo());
		} catch (error) {
			dispatch({
				type: UPDATE_DOCTOR_PROFESSIONAL_INFO_FAILURE,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

export {
	registerDoctor,
	getDoctorsList,
	getSingleDoctor,
	getPatientsList,
	acceptPatientRequest,
	getDoctorProfessionalInfo,
	updateDoctorProfessionalInfo,
};
