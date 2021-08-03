import React from 'react';
import { Spinner } from 'react-bootstrap';

// Loader component

const Loader = ({
	width = '100px',
	height = '100px',
	margin = 'auto',
	display = 'block',
}) => {
	return (
		<Spinner
			animation='border'
			role='status'
			style={{
				width,
				height,
				margin,
				display,
			}}
		>
			<span className='sr-only'>Loading...</span>
		</Spinner>
	);
};

export default Loader;
