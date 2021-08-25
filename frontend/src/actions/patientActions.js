import axios from 'axios';
import {
	REQUEST_DOCTOR_CONTACT_FAILURE,
	REQUEST_DOCTOR_CONTACT_REQUEST,
	REQUEST_DOCTOR_CONTACT_SUCCESS,
} from '../constants/patientConstants';

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

		const { data } = await axios.get(
			`/api/doctors/${doctorId}/request`,
			config
		);

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

export { requestDoctorContact };
