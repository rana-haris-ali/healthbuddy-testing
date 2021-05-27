import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/pharmacy/Header';
import Footer from './components/pharmacy/Footer';
import HomeScreen from './screens/pharmacy/HomeScreen';
import ProductScreen from './screens/pharmacy/ProductScreen';
import CartScreen from './screens/pharmacy/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/pharmacy/ShippingScreen';
import PaymentScreen from './screens/pharmacy/PaymentScreen';
import PlaceOrderScreen from './screens/pharmacy/PlaceOrderScreen';
import OrderScreen from './screens/pharmacy/OrderScreen';

const App = () => {
	return (
		<Router>
			<Header />
			<main className='py-3'>
				<Container>
					<Route path='/' component={HomeScreen} exact />
					<Route path='/products/:id' component={ProductScreen} />
					<Route path='/cart/:id?' component={CartScreen} />
					<Route path='/login' component={LoginScreen} />
					<Route path='/register' component={RegisterScreen} />
					<Route path='/profile' component={ProfileScreen} />
					<Route path='/shipping' component={ShippingScreen} />
					<Route path='/payment' component={PaymentScreen} />
					<Route path='/placeorder' component={PlaceOrderScreen} />
					<Route path='/orders/:id' component={OrderScreen} />
				</Container>
			</main>
			<Footer />
		</Router>
	);
};

export default App;
