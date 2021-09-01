import './conversation.css';

const Conversation = ({ conversation, history }) => {
	return (
		<div className='conversation'>
			<img
				className='conversationImage'
				src='/images/panadol.png'
				alt='avatar'
			/>
			<span className='conversationName'>
				{conversation.receiverDetails?.role === 'Doctor' ? 'Dr. ' : ''}
				{conversation.receiverDetails?.name}
			</span>
		</div>
	);
};

export default Conversation;
