import {
	GET_ALL_CONVERSATIONS_FAILURE,
	GET_ALL_CONVERSATIONS_REQUEST,
	GET_ALL_CONVERSATIONS_RESET,
	GET_ALL_CONVERSATIONS_SUCCESS,
	SEND_MESSAGE_FAILURE,
	SEND_MESSAGE_REQUEST,
	SEND_MESSAGE_SUCCESS,
} from '../constants/chatConstants';

const conversationsListReducer = (state = { conversations: [] }, action) => {
	switch (action.type) {
		case GET_ALL_CONVERSATIONS_REQUEST:
			return { ...state, loading: true };
		case GET_ALL_CONVERSATIONS_SUCCESS:
			return { ...state, loading: false, conversations: action.payload };
		case GET_ALL_CONVERSATIONS_FAILURE:
			return { ...state, loading: false, error: action.payload };
		case GET_ALL_CONVERSATIONS_RESET:
			return { conversations: [] };
		default:
			return state;
	}
};

const sendMessageReducer = (state = {}, action) => {
	switch (action.type) {
		case SEND_MESSAGE_REQUEST:
			return { loading: true };
		case SEND_MESSAGE_SUCCESS:
			return { loading: false, sentMessage: action.payload };
		case SEND_MESSAGE_FAILURE:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export { conversationsListReducer, sendMessageReducer };
