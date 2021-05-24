import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import FormContainer from '../../components/FormContainer';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { getShippingAddress } from '../../actions/pharmacy/cartActions';

const ShippingScreen = ({ history }) => {
	const [address, setAddress] = useState('');
	const [city, setCity] = useState('');
	const [postalCode, setPostalCode] = useState('');
	const [country, setCountry] = useState('');

	const dispatch = useDispatch();

	const cart = useSelector((state) => state.cart);
	const { loading, error, shippingAddress } = cart;

	const { userInfo } = useSelector((state) => state.userLogin);

	useEffect(() => {
		if (!userInfo) {
			// redirect to login if not logged in
			history.push('/login?redirect=shipping');
		} else {
			if (shippingAddress === undefined) {
				// if shippingAddress is empty then fetch get request
				dispatch(getShippingAddress());
			} else {
				setAddress(shippingAddress.address);
				setCity(shippingAddress.city);
				setPostalCode(shippingAddress.postalCode);
				setCountry(shippingAddress.country);
			}
		}
	}, [userInfo, history, dispatch, shippingAddress]);
	return (
		<FormContainer>
			{error && <Message variant='danger'>{error}</Message>}
			{loading ? (
				<Loader />
			) : (
				<Form>
					<Form.Group>
						<Form.Label>Address</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter Address'
							value={address}
							onChange={(e) => setAddress(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group>
						<Form.Label>City</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter City'
							value={city}
							onChange={(e) => setCity(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group>
						<Form.Label>Postal Code</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter Postal Code'
							value={postalCode}
							onChange={(e) => setPostalCode(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group>
						<Form.Label>Country</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter Country'
							value={country}
							onChange={(e) => setCountry(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Button type='submit'>Save & Continue</Button>
				</Form>
			)}
		</FormContainer>
	);
};

export default ShippingScreen;
