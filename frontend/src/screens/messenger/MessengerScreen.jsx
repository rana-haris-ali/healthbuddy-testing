import './messengerScreen.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../../components/Loader';
import Message from '../../components/Message';
import Conversation from '../../components/conversation/Conversation';
import ChatMessage from '../../components/chatMessage/ChatMessage';
import { GET_ALL_CONVERSATIONS_RESET } from '../../constants/chatConstants';
import { getAllConversationsList } from '../../actions/chatActions';

const MessengerScreen = ({ history }) => {
	const dispatch = useDispatch();

	const [currentChat, setCurrentChat] = useState(null);

	const { userInfo } = useSelector((state) => state.userLogin);

	const {
		loading: loadingConversations,
		conversations,
		error: errorConversations,
	} = useSelector((state) => state.conversationsList);

	useEffect(() => {
		// dispatch reset on logout
		if (!userInfo) {
			history.push('/login');
		}
		dispatch({ type: GET_ALL_CONVERSATIONS_RESET });
	}, [dispatch, history, userInfo]);

	useEffect(() => {
		dispatch(getAllConversationsList());
	}, [dispatch]);

	// useEffect(() => {
	// 	if (currentChat) {
	// 		dispatch(getConversationMessages(currentChat._id));
	// 	}
	// }, [currentChat]);
	return (
		<>
			{errorConversations && (
				<Message variant='danger'>{errorConversations}</Message>
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
									{currentChat.messages.map((message) => (
										<ChatMessage
											text={message.text}
											own={message.sender === userInfo?.roleId ? true : false}
											key={message._id}
										/>
									))}
								</div>
								<div className='chatBoxBottom'>
									<textarea
										className='chatMessageInput'
										placeholder='Type your message...'
									></textarea>
									<button className='chatSubmitButton'>Send</button>
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
