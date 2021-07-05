import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const MyModal = (props) => {
	const { title, heading, body, buttonText, onHide, clickHandler } = props;

	// extract the userName from body prop so we can make it bold
	const bodyText = body.split(':')[0];
	const userName = body.split(':')[1];
	return (
		<Modal
			{...props}
			size='md'
			aria-labelledby='contained-modal-title-vcenter'
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<h4>{heading}</h4>
				<p>
					{bodyText}: <strong>{userName}</strong>
				</p>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={onHide}>Cancel</Button>
				{/* return styled button if it is delete button */}
				{buttonText === 'Delete' ? (
					<Button
						onClick={clickHandler}
						style={{ backgroundColor: '#d11a2a', fontWeight: 'bold' }}
					>
						<i className='fas fa-trash' style={{ marginRight: '5px' }}></i>{' '}
						Delete
					</Button>
				) : (
					<Button onClick={clickHandler}>{buttonText}</Button>
				)}
			</Modal.Footer>
		</Modal>
	);
};

export default MyModal;
