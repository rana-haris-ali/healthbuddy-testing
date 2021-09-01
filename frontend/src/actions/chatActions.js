import axios from 'axios';

import {
	GET_ALL_CONVERSATIONS_REQUEST,
	GET_ALL_CONVERSATIONS_SUCCESS,
	GET_ALL_CONVERSATIONS_FAILURE,
} from '../constants/chatConstants';

const getAllConversationsList = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: GET_ALL_CONVERSATIONS_REQUEST,
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

		const { data } = await axios.get('/api/chat/conversations', config);

		dispatch({
			type: GET_ALL_CONVERSATIONS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: GET_ALL_CONVERSATIONS_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export { getAllConversationsList };
