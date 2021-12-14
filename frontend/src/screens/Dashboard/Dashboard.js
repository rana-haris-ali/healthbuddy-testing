import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import newsItems from './news';
import tipsItems from './tips';
import { getDashboardData } from '../../actions/dashboardActions';
import './Dashboard.css';

const Dashboard = () => {
	const dispatch = useDispatch();

	const bootstrapColumnGridLarge = 4;
	const bootstrapColumnGridMedium = 6;
	const bootstrapColumnGridSmall = 12;

	const { dashboardData } = useSelector((state) => state.dashboardData);

	useEffect(() => {
		dispatch(getDashboardData());
	}, [dispatch]);

	// const newsLoop = (index) => {
	// 	// document.getElementById('news-ticker').innerHTML = newsItems[index];
	// 	// setNews(newsItems[index]);
	// 	console.log(index);
	// 	setTimeout(newsLoop, 1000, (index + 1) % newsItems.length);
	// };
	const { userInfo } = useSelector((state) => state.userLogin);

	return (
		<div>
			<h1 className='text-center mb-5'>Welcome, {userInfo.name}</h1>

			{dashboardData && (
				<Row className='custom-row'>
					<Col
						className='text-center col-auto custom-column'
						lg={bootstrapColumnGridLarge}
						md={bootstrapColumnGridMedium}
						sm={bootstrapColumnGridSmall}
					>
						<h1>Patients: {dashboardData.totalPatients}</h1>
					</Col>
					<Col
						className='text-center col-auto custom-column'
						lg={bootstrapColumnGridLarge}
						md={bootstrapColumnGridMedium}
						sm={bootstrapColumnGridSmall}
					>
						<h1>Doctors:{dashboardData.totalDoctors}</h1>
					</Col>
					<Col
						className='text-center col-auto custom-column'
						lg={bootstrapColumnGridLarge}
						md={bootstrapColumnGridMedium}
						sm={bootstrapColumnGridSmall}
					>
						<h1>Today Cases:{dashboardData.covidNumbers.todayCases}</h1>
					</Col>
					<Col
						className='text-center col-auto custom-column'
						lg={bootstrapColumnGridLarge}
						md={bootstrapColumnGridMedium}
						sm={bootstrapColumnGridSmall}
					>
						<h1>Today Deaths:{dashboardData.covidNumbers.todayDeaths}</h1>
					</Col>
					<Col
						className='text-center col-auto custom-column'
						lg={bootstrapColumnGridLarge}
						md={bootstrapColumnGridMedium}
						sm={bootstrapColumnGridSmall}
					>
						<h1>Today Recovered:{dashboardData.covidNumbers.todayRecovered}</h1>
					</Col>
					<Col
						className='text-center col-auto custom-column'
						lg={bootstrapColumnGridLarge}
						md={bootstrapColumnGridMedium}
						sm={bootstrapColumnGridSmall}
					>
						<h1>Active Cases: {dashboardData.covidNumbers.active}</h1>
					</Col>
				</Row>
			)}

			<Row>
				<Col md={3}>
					<h4 className='text-center  mt-3 mb-1'>News</h4>
					<marquee width='100%' direction='up' height='300vh' scrollAmount='10'>
						<ul>
							{newsItems.map((newsItem, index) => (
								<li key={index}>{newsItem}</li>
							))}
						</ul>
					</marquee>

					{/* {news.map(newsItem=>)} */}
					{/* <textarea
						className='myTextarea'
						readOnly
						value={newsItems.join('\n \n')}
					></textarea> */}
					{/* <div className='myContainer'>DIV</div> */}
				</Col>
				<Col md={6}></Col>
				<Col md={3}>
					<h4 className='text-center mt-3 mb-1'>Tips</h4>
					<marquee width='100%' direction='up' height='300vh' scrollAmount='10'>
						<ul>
							{tipsItems.map((tipsItem, index) => (
								<li key={index}>{tipsItem}</li>
							))}
						</ul>
					</marquee>
				</Col>
			</Row>
		</div>
	);
};

export default Dashboard;
