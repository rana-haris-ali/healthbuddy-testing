import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import FormContainer from '../../components/FormContainer';
import NavigationSteps from '../../components/NavigationSteps';
import { savePaymentMethod } from '../../actions/pharmacy/cartActions';

const PaymentMethodScreen = ({ history }) => {
	const [paymentMethod, setPaymentMethod] = useState('PayPal or Credit Card');

	const dispatch = useDispatch();

	const { userInfo } = useSelector((state) => state.userLogin);

	if (!userInfo) {
		history.push('/login?redirect=payment');
	}

	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	if (!shippingAddress) {
		history.push('/login?redirect=shipping');
	}

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(savePaymentMethod(paymentMethod));
		history.push('/placeorder');
	};
	return (
		<FormContainer>
			<NavigationSteps
				steps={[
					{ name: 'Login', link: '/login' },
					{ name: 'Shipping', link: '/shipping' },
					{ name: 'Payment', link: '/payment' },
					{ name: 'Place Order', link: '/placeorder' },
				]}
				disabledSteps={['Place Order']}
				currentStep='Payment'
			/>
			<h1 className='text-center'>Payment Method</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group>
					<Form.Label as='legend' className='mt-4'>
						Select Method
					</Form.Label>
					<Col>
						<Form.Check
							type='radio'
							label='Paypal or Credit Card'
							id='payPal'
							name='paymentMethod'
							value='PayPal or Credit Card'
							className='mt-2 mb-2'
							onChange={(e) => setPaymentMethod(e.target.value)}
						></Form.Check>
						<Form.Check
							type='radio'
							label='Cash on Delivery'
							id='cashOnDelivery'
							name='paymentMethod'
							value='Cash On Delivery'
							className='mt-2 mb-2'
							onChange={(e) => setPaymentMethod(e.target.value)}
						></Form.Check>
					</Col>
				</Form.Group>
				<Button className='mt-4' type='submit' variant='dark'>
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
};

export default PaymentMethodScreen;
