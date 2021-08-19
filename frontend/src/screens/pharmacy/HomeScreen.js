import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../../components/Loader';
import Message from '../../components/Message';
import Product from '../../components/pharmacy/Product';
import Paginate from '../../components/Paginate';
import { productList } from '../../actions/pharmacy/productActions';

// ePharmacy homescreen

const HomeScreen = ({ match }) => {
	// check if a search keyword has been passed
	const keyword = match.params.keyword;

	// check if a pageNumber parameter has been passed
	const pageNumber = match.params.pageNumber || 1;

	const dispatch = useDispatch();
	const { loading, products, currentPageNumber, totalPages, error } =
		useSelector((state) => state.productList);

	useEffect(() => {
		// if a search keyword is passed, then get the relevant products
		dispatch(productList(keyword, pageNumber));
	}, [dispatch, keyword, pageNumber]);
	return (
		<>
			{/* display h1 after loading is done */}
			{products && <h1>Latest Products</h1>}

			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<>
					<Row>
						{products.map((product) => (
							<Col sm={12} md={6} lg={4} xl={3} key={product._id}>
								<Product product={product} />
							</Col>
						))}
					</Row>
					<Paginate
						totalPages={totalPages}
						currentPage={currentPageNumber}
						keyword={keyword ? keyword : ''}
					/>
				</>
			)}
		</>
	);
};

export default HomeScreen;
