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
import PaymentMethodScreen from './screens/pharmacy/PaymentMethodScreen';
import PlaceOrderScreen from './screens/pharmacy/PlaceOrderScreen';
import OrderScreen from './screens/pharmacy/OrderScreen';
import UserListAdminScreen from './screens/admin/UserListAdminScreen';
import UserEditAdminScreen from './screens/admin/UserEditAdminScreen';

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
					<Route path='/payment' component={PaymentMethodScreen} />
					<Route path='/placeorder' component={PlaceOrderScreen} />
					<Route path='/order/:id' component={OrderScreen} />
					<Route path='/admin/userList' component={UserListAdminScreen} />
					<Route path='/admin/user/:id/edit' component={UserEditAdminScreen} />
				</Container>
			</main>
			<Footer />
		</Router>
	);
};

export default App;
