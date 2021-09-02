import axios from 'axios';

import {
	GET_ALL_CONVERSATIONS_REQUEST,
	GET_ALL_CONVERSATIONS_SUCCESS,
	GET_ALL_CONVERSATIONS_FAILURE,
	SEND_MESSAGE_REQUEST,
	SEND_MESSAGE_SUCCESS,
	SEND_MESSAGE_FAILURE,
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

const sendMessage = (messageObject) => async (dispatch, getState) => {
	try {
		dispatch({
			type: SEND_MESSAGE_REQUEST,
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

		const { data } = await axios.post(
			`/api/chat/messages/${messageObject.conversationId}`,
			{ text: messageObject.text },
			config
		);

		dispatch({
			type: SEND_MESSAGE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: SEND_MESSAGE_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export { getAllConversationsList, sendMessage };
