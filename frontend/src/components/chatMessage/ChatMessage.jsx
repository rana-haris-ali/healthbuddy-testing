import './chatMessage.css';

const Message = ({ own }) => {
	return (
		<div className={own ? 'message own' : 'message'}>
			<div className='messageTop'>
				<img
					className='messageImage'
					src='/images/strepsils.jpg'
					alt='avatar'
				/>
				<p className='messageText'>Hello i am haris</p>
			</div>
			<div className='messageBottom'>1 hour ago</div>
		</div>
	);
};

export default Message;
