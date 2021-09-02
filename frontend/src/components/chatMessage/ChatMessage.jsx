import './chatMessage.css';
import { format } from 'timeago.js';

const Message = ({ text, createdAt, own, receiverName }) => {
	return (
		<div className={own ? 'message own' : 'message'}>
			<span className='messageSenderText'>
				{own ? 'Me' : `${receiverName}`}
			</span>
			<div className='messageTop'>
				<img
					className='messageImage'
					src='/images/strepsils.jpg'
					alt='avatar'
				/>
				<p className='messageText'>{text}</p>
			</div>
			<div className='messageBottom'>{format(createdAt)}</div>
		</div>
	);
};

export default Message;
