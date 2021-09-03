import './messengerScreen.css';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import Loader from '../../components/Loader';
import Message from '../../components/Message';
import Conversation from '../../components/conversation/Conversation';
import ChatMessage from '../../components/chatMessage/ChatMessage';
import {
	GET_ALL_CONVERSATIONS_RESET,
	GET_MESSAGES_OF_CONVERSATION_SUCCESS,
	GET_MESSAGES_OF_CONVERSATION_RESET,
} from '../../constants/chatConstants';
import {
	getAllConversationsList,
	getMessagesOfConversation,
} from '../../actions/chatActions';

const MessengerScreen = ({ history }) => {
	const dispatch = useDispatch();

	// scrollRef for scrolling to end of conversation
	const scrollRef = useRef();

	// state for storing currentChat
	const [currentChat, setCurrentChat] = useState(null);

	// state for storing newMessage
	const [newMessage, setNewMessage] = useState('');

	// errorValidation to be shown for validation and other errors etc.
	const [errorValidation, setErrorValidation] = useState('');

	const { userInfo } = useSelector((state) => state.userLogin);

	const {
		loading: loadingConversations,
		conversations,
		error: errorConversations,
	} = useSelector((state) => state.conversationsList);

	const { messages, error: errorMessages } = useSelector(
		(state) => state.chatMessages
	);

	useEffect(() => {
		// dispatch reset on logout
		if (!userInfo) {
			history.push('/login?redirect=messenger');
		}
		dispatch({ type: GET_ALL_CONVERSATIONS_RESET });
		dispatch({ type: GET_MESSAGES_OF_CONVERSATION_RESET });
	}, [dispatch, history, userInfo]);

	// fetch all conversations list on page load
	useEffect(() => {
		dispatch(getAllConversationsList());
	}, [dispatch]);

	// fetch messages of a conversation
	useEffect(() => {
		if (currentChat) {
			dispatch(getMessagesOfConversation(currentChat._id));
		}
	}, [dispatch, currentChat]);

	// useEffect for scrolling to end of conversation
	useEffect(() => {
		scrollRef.current?.scrollIntoView();
	}, [messages]);

	const handleMessageSubmit = async (e) => {
		e.preventDefault();
		if (newMessage) {
			try {
				const config = {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${userInfo.token}`,
					},
				};

				const { data: sentMessage } = await axios.post(
					`/api/chat/messages/${currentChat?._id}`,
					{ text: newMessage },
					config
				);

				dispatch({
					type: GET_MESSAGES_OF_CONVERSATION_SUCCESS,
					payload: [...messages, sentMessage],
				});
			} catch (error) {
				console.log(
					error.response && error.response.data.message
						? error.response.data.message
						: error.message
				);
			}
			setNewMessage('');
			setErrorValidation('');
		} else {
			setErrorValidation('Cannot send empty message');
		}
	};
	return (
		<>
			{errorConversations && (
				<Message variant='danger'>{errorConversations}</Message>
			)}
			{errorMessages && <Message variant='danger'>{errorMessages}</Message>}
			{errorValidation && (
				<Message variant='warning'>{errorValidation}</Message>
			)}
			<div className='messenger'>
				<div className='chatMenu'>
					<div className='chatMenuWrapper'>
						<p
							style={{
								fontSize: '22px',
								fontWeight: '800',
								borderBottom: '1px solid gray',
							}}
						>
							Conversations
						</p>
						{loadingConversations ? (
							<Loader />
						) : conversations.length > 0 ? (
							conversations.map((conversation) => (
								<div
									// change color onClick
									className={
										currentChat?.receiverId === conversation.receiverId
											? 'changeBackground'
											: ''
									}
									onClick={() => setCurrentChat(conversation)}
									key={conversation._id}
								>
									<Conversation
										conversation={conversation}
										key={conversation._id}
									/>
								</div>
							))
						) : (
							<Message>You dont have any conversations</Message>
						)}
					</div>
				</div>
				<div className='chatBox'>
					<div className='chatBoxWrapper'>
						{currentChat ? (
							<>
								<div className='chatBoxTop'>
									{messages.length > 0 ? (
										messages.map((message) => (
											<div ref={scrollRef} key={message._id}>
												<ChatMessage
													receiverName={currentChat?.receiverDetails.name}
													text={message.text}
													createdAt={message.createdAt}
													own={
														message.sender === userInfo?.roleId ? true : false
													}
												/>
											</div>
										))
									) : (
										<span className='noConversationText'>
											There are no messages yet.
											<br /> Send a message to start conversation.
										</span>
									)}
								</div>
								<div className='chatBoxBottom'>
									<textarea
										className='chatMessageInput'
										placeholder='Type your message...'
										onChange={(e) => setNewMessage(e.target.value)}
										value={newMessage}
									></textarea>
									<button
										className='chatSubmitButton'
										onClick={handleMessageSubmit}
										disabled={!currentChat}
									>
										Send
									</button>
								</div>
							</>
						) : (
							<span className='noConversationText'>
								Please select a conversation
							</span>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default MessengerScreen;
