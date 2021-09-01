import './chatMessage.css';

const Message = ({ text, own }) => {
	return (
		<div className={own ? 'message own' : 'message'}>
			<div className='messageTop'>
				<img
					className='messageImage'
					src='/images/strepsils.jpg'
					alt='avatar'
				/>
				<p className='messageText'>{text}</p>
			</div>
			<div className='messageBottom'>1 hour ago</div>
		</div>
	);
};

export default Message;
