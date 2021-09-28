import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

import newsItems from './news';
import tipsItems from './tips';
import './Dashboard.css';

const Dashboard = () => {
	const [news, setNews] = useState('');

	// const newsLoop = (index) => {
	// 	// document.getElementById('news-ticker').innerHTML = newsItems[index];
	// 	// setNews(newsItems[index]);
	// 	console.log(index);
	// 	setTimeout(newsLoop, 1000, (index + 1) % newsItems.length);
	// };

	return (
		<div>
			<h1 className='text-center mb-5'>Welcome</h1>
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
