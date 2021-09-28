import React, { useState } from 'react';
import { Row, Col, Image, Button } from 'react-bootstrap';

const WelcomeScreen = () => {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const mouseOver = (event) => {
		event.target.style.color = '#457b9d';
	};
	const mouseOut = (event) => {
		event.target.style.color = 'black';
	};

	window.addEventListener('resize', function () {
		setWindowWidth(window.innerWidth);
	});

	return (
		<div id='wrapper' style={{ backgroundColor: 'white' }}>
			<Row style={{ backgroundColor: '#F5F5F5', borderRadius: '10px' }}>
				<Col lg={8}>
					<Col className='py-4 px-5' style={{ position: 'relative' }} md={8}>
						<h1 style={{ marginBottom: '10px', paddingBottom: '0' }}>
							Welcome To healthBuddy
						</h1>
						<p>
							The world's leading partner for remote diagnosis and consultation.
							Trust us because we care about you! The world's leading partner
							for remote diagnosis and consultation. Trust us because we care
							about you! The world's leading partner for remote diagnosis and
							consultation. Trust us because we care about you!
						</p>
						<Button className='btn my-5'>More Information</Button>
					</Col>
				</Col>
				<Col>
					{windowWidth > 1000 ? (
						<Image width='400vh' src='/images/doctor.png' fluid rounded />
					) : null}
				</Col>
			</Row>
			<h3 style={{ textAlign: 'center', fontFamily: 'Lora', marginTop: '10%' }}>
				<b>Why Choose Us?</b>
			</h3>
			<br />
			<Row
				style={{
					width: '80%',
					position: 'relative',
					marginTop: '5%',
					left: '10%',
					right: '10%',
					marginBottom: '20%',
					textAlign: 'center',
				}}
			>
				<Col md={4}>
					<i
						onMouseOver={mouseOver}
						onMouseOut={mouseOut}
						style={{ fontSize: '50px' }}
						className='icon fas fa-check-circle fa-4x mb-4'
					></i>
					<h3 style={{ fontWeight: '600' }}>Easy to use.</h3>
					<p>Our interface is very easy to use for everyone.</p>
				</Col>
				<Col md={4}>
					<i
						onMouseOver={mouseOver}
						onMouseOut={mouseOut}
						style={{ fontSize: '50px' }}
						className='icon fas fa-building fa-4x mb-4'
					></i>
					<h3 style={{ fontWeight: '600' }}>Elite Clientele</h3>
					<p>We have users from all over the world.</p>
				</Col>
				<Col md={4}>
					<i
						onMouseOver={mouseOver}
						onMouseOut={mouseOut}
						style={{
							fontSize: '50px',
							position: 'relative',
						}}
						className='icon fas fa-prescription-bottle-alt fa-4x mb-4'
					></i>
					<h3 style={{ fontWeight: 'bold', color: 'black' }}>e-Pharmacy</h3>
					<p>Buy all sorts of medical supplies online.</p>
				</Col>
			</Row>
		</div>
	);
};

export default WelcomeScreen;

// import React from 'react';
// import { Row, Col } from 'react-bootstrap';
// import './Dashboard.css';

// const Dashboard = () => {
// 	return (
// 		<div>
// 			<h1 className='text-center mb-5'>Welcome</h1>
// 			<Row>
// 				<Col md={3}>
// 					<h5 className='text-center'>News</h5>
// 					<div className='myContainer'>DIV</div>
// 				</Col>
// 				<Col md={6}></Col>
// 				<Col md={3}>
// 					<h5 className='text-center'>Notifications</h5>
// 				</Col>
// 			</Row>
// 		</div>
// 	);
// };

// export default Dashboard;
