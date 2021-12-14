import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Header from './components/pharmacy/Header';
import Footer from './components/pharmacy/Footer';
import HomeScreen from './screens/pharmacy/HomeScreen';
import ProductScreen from './screens/pharmacy/ProductScreen';
import CartScreen from './screens/pharmacy/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import PatientRegisterScreen from './screens/RegisterScreens/PatientRegisterScreen';
import DoctorRegisterScreen from './screens/RegisterScreens/DoctorRegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import MyOrdersScreen from './screens/MyOrdersScreen/MyOrdersScreen';
import ShippingScreen from './screens/pharmacy/ShippingScreen';
import PaymentMethodScreen from './screens/pharmacy/PaymentMethodScreen';
import PlaceOrderScreen from './screens/pharmacy/PlaceOrderScreen';
import OrderScreen from './screens/pharmacy/OrderScreen';
import UserListAdminScreen from './screens/admin/UserListAdminScreen';
import UserEditAdminScreen from './screens/admin/UserEditAdminScreen';
import ProductListAdminScreen from './screens/admin/ProductListAdminScreen';
import ProductCreateAdminScreen from './screens/admin/ProductCreateAdminScreen';
import ProductEditAdminScreen from './screens/admin/ProductEditAdminScreen';
import OrderListAdminScreen from './screens/admin/OrderListAdminScreen';
import DoctorsListAdminScreen from './screens/admin/DoctorsListAdminScreen';
import WelcomeScreen from './screens/WelcomeScreen/WelcomeScreen';
import Dashboard from './screens/Dashboard/Dashboard';
import DoctorsListScreen from './screens/DoctorsListScreen';
import DoctorScreen from './screens/DoctorScreen';
import PatientsListScreen from './screens/PatientsListScreen';
import PatientAllRequestsScreen from './screens/PatientAllRequestsScreen';
import MessengerScreen from './screens/messenger/MessengerScreen';
import LungsPredictionScreen from './screens/LungsPredictionScreen/LungsPredictionScreen';
import DiseasePredictionScreen from './screens/DiseasePredictionScreen/DiseasePredictionScreen';

const App = () => {
	const { userInfo } = useSelector((state) => state.userLogin);

	return (
		<Router>
			<Header />
			<main className='py-3'>
				<Container>
					<Route
						path='/'
						component={userInfo ? Dashboard : WelcomeScreen}
						exact
					/>
					<Route path='/pharmacy-home' component={HomeScreen} exact />
					<Route path='/page/:pageNumber' component={HomeScreen} exact />
					<Route
						path='/search/:keyword/page/:pageNumber'
						component={HomeScreen}
						exact
					/>

					<Route
						path='/lungs-prediction'
						component={LungsPredictionScreen}
						exact
					/>
					<Route
						path='/disease-prediction'
						component={DiseasePredictionScreen}
						exact
					/>
					<Route path='/doctors' component={DoctorsListScreen} exact />
					<Route path='/doctors/:id' component={DoctorScreen} exact />
					<Route path='/patients' component={PatientsListScreen} exact />
					<Route
						path='/patients/requests'
						component={PatientAllRequestsScreen}
						exact
					/>
					<Route path='/dashboard' component={Dashboard} exact />
					<Route path='/search/:keyword' component={HomeScreen} exact />
					<Route path='/products/:id' component={ProductScreen} />
					<Route path='/cart/:id?' component={CartScreen} />
					<Route path='/login' component={LoginScreen} />
					<Route path='/register-patient' component={PatientRegisterScreen} />
					<Route path='/register-doctor' component={DoctorRegisterScreen} />
					<Route path='/register' component={RegisterScreen} />
					<Route path='/profile' component={ProfileScreen} />
					<Route path='/messenger' component={MessengerScreen} />
					<Route path='/shipping' component={ShippingScreen} />
					<Route path='/payment' component={PaymentMethodScreen} />
					<Route path='/placeorder' component={PlaceOrderScreen} />
					<Route path='/orders' component={MyOrdersScreen} />
					<Route path='/order/:id' component={OrderScreen} />
					<Route path='/admin/userList' component={UserListAdminScreen} />
					<Route path='/admin/user/:id/edit' component={UserEditAdminScreen} />
					<Route
						path='/admin/productList'
						component={ProductListAdminScreen}
						exact
					/>
					<Route
						path='/admin/productList/:pageNumber'
						component={ProductListAdminScreen}
						exact
					/>
					<Route path='/admin/orderList' component={OrderListAdminScreen} />
					<Route
						path='/admin/createProduct'
						component={ProductCreateAdminScreen}
					/>
					<Route
						path='/admin/product/:id/edit'
						component={ProductEditAdminScreen}
					/>
					<Route path='/admin/doctors' component={DoctorsListAdminScreen} />
				</Container>
			</main>
			<Footer />
		</Router>
	);
};

export default App;
