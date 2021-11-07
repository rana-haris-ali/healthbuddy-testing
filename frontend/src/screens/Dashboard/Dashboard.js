import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import newsItems from './news';
import tipsItems from './tips';
import { getDashboardData } from '../../actions/dashboardActions';
import './Dashboard.css';

const Dashboard = () => {
	const dispatch = useDispatch();

	const [news, setNews] = useState('');

	const { loading, error, dashboardData } = useSelector(
		(state) => state.dashboardData
	);

	useEffect(() => {
		dispatch(getDashboardData());
	}, []);

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
				<h1>
					Patients: {dashboardData.totalPatients}
					<br />
					Doctors:{dashboardData.totalDoctors}
					<br />
					Today Cases:{dashboardData.covidNumbers.todayCases}
					<br />
					Today Deaths:{dashboardData.covidNumbers.todayDeaths}
					<br />
					Today Recovered:{dashboardData.covidNumbers.todayRecovered}
				</h1>
			)}

			<Row>
				<Col md={3}>
					<h4 className='text-center  mt-3 mb-1'>News</h4>
					<marquee width='100%' direction='up' height='300vh' scrollAmount='10'>
						<ul>
							{newsItems.map((newsItem) => (
								<li>{newsItem}</li>
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
							{tipsItems.map((tipsItem) => (
								<li>{tipsItem}</li>
							))}
						</ul>
					</marquee>
				</Col>
			</Row>
		</div>
	);
};

export default Dashboard;
