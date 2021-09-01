import './messengerScreen.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../../components/Loader';
import Message from '../../components/Message';
import Conversation from '../../components/conversation/Conversation';
import ChatMessage from '../../components/chatMessage/ChatMessage';
import { GET_ALL_CONVERSATIONS_RESET } from '../../constants/chatConstants';
import { getAllConversationsList } from '../../actions/chatActions';

const MessengerScreen = ({ history }) => {
	const dispatch = useDispatch();

	const { userInfo } = useSelector((state) => state.userLogin);

	const {
		loading: loadingConversations,
		conversations,
		error,
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
	return (
		<>
			{error && <Message variant='danger'>{error}</Message>}
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
								<Conversation
									conversation={conversation}
									key={conversation.receiverId}
								/>
							))
						) : (
							<Message>You dont have any conversations</Message>
						)}
					</div>
				</div>
				<div className='chatBox'>
					<div className='chatBoxWrapper'>
						<div className='chatBoxTop'>
							<ChatMessage />
							<ChatMessage own={true} />
							<ChatMessage />
							<ChatMessage own={true} />
							<ChatMessage />
							<ChatMessage />
							<ChatMessage />
							<ChatMessage own={true} />
							<ChatMessage />
							<ChatMessage />
							<ChatMessage />
						</div>
						<div className='chatBoxBottom'>
							<textarea
								className='chatMessageInput'
								placeholder='Type your message...'
							></textarea>
							<button className='chatSubmitButton'>Send</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default MessengerScreen;
