import React from 'react';
import { Alert } from 'react-bootstrap';

// Loader component
// variant prop to set message type i.e. danger etc.

const Message = ({ variant, children }) => {
	return <Alert variant={variant}>{children}</Alert>;
};

Message.defaultProps = {
	variant: 'info',
};

export default Message;
