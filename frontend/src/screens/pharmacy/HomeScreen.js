import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Product from '../../components/pharmacy/Product';
import { productList } from '../../actions/pharmacy/productActions';

// ePharmacy homescreen

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { loading, products, error } = useSelector(
    (state) => state.productList
  );
  useEffect(() => {
    dispatch(productList());
  }, [dispatch]);
  return (
    <>
      <h1>Latest Products</h1>

      {loading ? (
        <h1>Loading</h1>
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <Row>
          {products.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
