import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Rating from './Rating';

// render a single product as card

const Product = ({ product }) => {
	return (
		<Card className='my-3 p-3 rounded'>
			<Link to={`/products/${product._id}`}>
				<Card.Img className='card-img-top' variant='top' src={product.image} />
			</Link>
			<Card.Body>
				<Link to={`/products/${product._id}`}>
					<Card.Title as='div'>
						<strong>{product.name}</strong>
					</Card.Title>
				</Link>
				<Card.Text as='div'>
					<Rating
						value={product.rating}
						text={`${product.numReviews} reviews`}
					/>
				</Card.Text>
				<Card.Text id='product-price-padding' as='h4'>
					Rs. {product.price}
				</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default Product;
