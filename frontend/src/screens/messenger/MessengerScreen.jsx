import './messengerScreen.css';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import Select from 'react-select';
import axios from 'axios';
import io from 'socket.io-client';

import Loader from '../../components/Loader';
import Message from '../../components/Message';
import Conversation from '../../components/conversation/Conversation';
import ChatMessage from '../../components/chatMessage/ChatMessage';
import {
	GET_ALL_CONVERSATIONS_RESET,
	GET_MESSAGES_OF_CONVERSATION_SUCCESS,
	GET_MESSAGES_OF_CONVERSATION_RESET,
	CREATE_NEW_CONVERSATION_RESET,
	GET_ALL_CONVERSATIONS_SUCCESS,
} from '../../constants/chatConstants';
import {
	getAllConversationsList,
	getMessagesOfConversation,
} from '../../actions/chatActions';
import { getAcceptedDoctors } from '../../actions/patientActions';
import { GET_ACCEPTED_DOCTORS_RESET } from '../../constants/patientConstants';

const MessengerScreen = ({ history, match, location }) => {
	const dispatch = useDispatch();

	// scrollRef for scrolling to end of conversation
	const scrollRef = useRef();

	// state for storing currentChat
	const [currentChat, setCurrentChat] = useState(null);

	// state for storing newMessage
	const [newMessage, setNewMessage] = useState('');

	// state for received message
	// const [receivedMessage] = useState({});

	// errorValidation to be shown for validation and other errors etc.
	const [errorValidation, setErrorValidation] = useState('');

	// error message to be shown for server errors.
	const [error, setError] = useState('');

	// toggle new chat dropdown.
	const [showNewChatDropDown, setShowNewChatDropDown] = useState(false);

	// ref for socket
	const socket = useRef();

	const { userInfo } = useSelector((state) => state.userLogin);

	const {
		loading: loadingConversations,
		conversations,
		error: errorConversations,
	} = useSelector((state) => state.conversationsList);

	const { messages, error: errorMessages } = useSelector(
		(state) => state.chatMessages
	);

	const { acceptedDoctors } = useSelector((state) => state.acceptedDoctors);

	useEffect(() => {
		// dispatch reset on logout
		if (!userInfo) {
			history.push('/login?redirect=messenger');
		}
		dispatch({ type: GET_ALL_CONVERSATIONS_RESET });
		dispatch({ type: GET_MESSAGES_OF_CONVERSATION_RESET });
		dispatch({ type: GET_ACCEPTED_DOCTORS_RESET });
		dispatch({ type: CREATE_NEW_CONVERSATION_RESET });
	}, [dispatch, history, userInfo]);

	// // open specific conversation if url contains a conversation id as parameter
	// useEffect(() => {
	// 	setCurrentChat(
	// 		conversations?.find(
	// 			(conversation) =>
	// 				conversation.receiverId === location.search.split('=')[1]
	// 		)
	// 	);
	// }, [conversations, location.search]);

	useEffect(() => {
		socket.current = io('ws://localhost:8900');
	}, []);

	useEffect(() => {
		socket.current?.emit('addUser', userInfo?.roleId);
		socket.current?.on('getUsers', (users) => {});
		socket.current?.on('getConversation', () => {
			setTimeout(() => dispatch(getAllConversationsList()), 500);
		});
	}, [userInfo, socket, dispatch]);

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

	// useEffect for received message
	useEffect(() => {
		socket.current?.on('getMessage', (data) => {
			setTimeout(
				() => dispatch(getMessagesOfConversation(data.conversationId)),
				500
			);
			// // console.log(data);
			// console.log(data);
			// setReceivedMessage({
			// 	sender: data.senderId,
			// 	text: data.messageText,
			// 	createdAt: Date.now(),
			// });
		});
	}, [socket, dispatch]);

	// if message is received from currentChat sender, then update messages state
	// useEffect(() => {
	// 	receivedMessage &&
	// 		currentChat?.receiverId === receivedMessage.sender &&
	// 		dispatch({
	// 			type: GET_MESSAGES_OF_CONVERSATION_SUCCESS,
	// 			payload: [...messages, receivedMessage],
	// 		});
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [receivedMessage, currentChat?.receiverId, dispatch]);

	useEffect(() => {
		if (userInfo?.role === 'Patient') {
			dispatch(getAcceptedDoctors());
		}
		// const createDoctorOptionsForSelect = async () => {
		// 	try {
		// 		const config = {
		// 			headers: {
		// 				'Content-Type': 'application/json',
		// 				Authorization: `Bearer ${userInfo.token}`,
		// 			},
		// 		};
		// 		const { data } = await axios.get(
		// 			'/api/patients/doctors/accepted',
		// 			config
		// 		);
		// 		setDoctorOptions(
		// data.map((doctor) => {
		// 	return { value: doctor._id, label: `Dr. ${doctor.user.name}` };
		// })
		// 		);
		// 	} catch (error) {
		// 		console.log(error);
		// 		setErrorValidation(error);
		// 	}
		// };
		// createDoctorOptionsForSelect();
	}, [dispatch, userInfo?.role]);

	const handleMessageSubmit = async (e) => {
		e.preventDefault();
		if (newMessage) {
			try {
				// emit socket event
				socket.current?.emit('sendMessage', {
					senderId: userInfo?.roleId,
					receiverId: currentChat?.receiverId,
					conversationId: currentChat._id,
					messageText: newMessage,
				});

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
				setError(
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

	const newConversation = async (e) => {
		// if conversation with the doctor already exists then show error message
		if (
			conversations.find((conversation) => conversation.receiverId === e.value)
		) {
			setErrorValidation(`Conversation with ${e.label} already exists.`);
		} else {
			setErrorValidation('');

			try {
				const config = {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${userInfo.token}`,
					},
				};

				const { data: newConversation } = await axios.post(
					`/api/chat/conversations/${e.value}`,
					{},
					config
				);

				// emit socket event
				socket.current?.emit('createConversation', {
					receiverId: e.value,
				});

				dispatch({
					type: GET_ALL_CONVERSATIONS_SUCCESS,
					payload: [newConversation, ...conversations],
				});
				setCurrentChat(newConversation);
			} catch (error) {
				console.log(
					error.response && error.response.data.message
						? error.response.data.message
						: error.message
				);
				setError(
					error.response && error.response.data.message
						? error.response.data.message
						: error.message
				);
			}

			// dispatch(createNewConversation(e.value));
			// socket.current?.emit('createConversation', { receiverId: e.value });
			// dispatch(getAllConversationsList());
			// history.push(`/messenger?open=${e.value}`);
		}
	};

	return (
		<>
			{error && <Message variant='danger'>{error}</Message>}
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
						{userInfo?.role === 'Patient' && (
							<Button
								className='btn w-100'
								onClick={() => setShowNewChatDropDown(true)}
							>
								New Chat
							</Button>
						)}
						{userInfo?.role === 'Patient' && showNewChatDropDown && (
							<Select
								closeMenuOnSelect={true}
								name='newChat'
								options={acceptedDoctors?.map((doctor) => {
									return {
										value: doctor._id,
										label: `Dr. ${doctor.user.name}`,
										key: doctor._id,
									};
								})}
								className='basic-select'
								classNamePrefix='select'
								placeholder='Please select the doctor'
								onChange={newConversation}
							/>
						)}
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
										style={{ resize: 'none', overflowY: 'scroll' }}
										// maxLength='100'
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
