import React from 'react';
import { Row, Col } from 'react-bootstrap';

const Dashboard = () => {
	return (
		<div>
			<h1 className='text-center mb-5'>Welcome</h1>
			<Row>
				<Col md={3}>
					<h5 className='text-center'>News</h5>
				</Col>
				<Col md={6}></Col>
				<Col md={3}>
					<h5 className='text-center'>Notifications</h5>
				</Col>
			</Row>
		</div>
	);
};

export default Dashboard;
