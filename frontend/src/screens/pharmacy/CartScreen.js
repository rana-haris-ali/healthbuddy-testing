import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../actions/pharmacy/cartActions';

const CartScreen = ({ match, location, history }) => {
	const dispatch = useDispatch();
	// const state = useSelector(state => state.state)
	const productId = match.params.id;
	const qty = location.search ? Number(location.search.split('=')[1]) : 1;
	useEffect(() => {
		if (productId) {
			dispatch(addToCart(productId, qty));
		}
	}, [dispatch, productId, qty]);
	return <div>Cart</div>;
};

export default CartScreen;
