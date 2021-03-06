import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {
	productListReducer,
	productDetailsReducer,
	productCreateReviewReducer,
	productCreateAdminReducer,
	productEditAdminReducer,
	productDeleteAdminReducer,
} from './reducers/pharmacy/productReducers';
import { cartReducer } from './reducers/pharmacy/cartReducers';
import {
	userLoginReducer,
	userRegisterReducer,
	userDetailsReducer,
	userUpdateProfileReducer,
	userDetailsAdminReducer,
	userEditAdminReducer,
	userDeleteAdminReducer,
	userListAdminReducer,
} from './reducers/pharmacy/userReducers';
import {
	orderCreateReducer,
	orderDetailsReducer,
	myOrdersListReducer,
	orderPayReducer,
	orderDeliverReducer,
	getOrdersAdminReducer,
} from './reducers/pharmacy/orderReducers';

import {
	registerDoctorReducer,
	doctorsListReducer,
	doctorDetailsReducer,
	patientsListReducer,
	acceptPatientRequestReducer,
	getProfessionalInfoReducer,
	updateProfessionalInfoReducer,
	doctorCreateReviewReducer,
	doctorToggleVerificationReducer,
} from './reducers/doctorReducers';

import {
	registerPatientReducer,
	patientDetailsReducer,
	requestDoctorContactReducer,
	patientAllRequestsReducer,
	acceptedDoctorsReducer,
	getMedicalInfoReducer,
	updateMedicalInfoReducer,
} from './reducers/patientReducers';

import {
	conversationsListReducer,
	chatMessagesReducer,
	sendMessageReducer,
	createConversationReducer,
} from './reducers/chatReducers';

import {
	lungsPredictionReducer,
	diseasePredictionReducer,
} from './reducers/predictionReducers';

import { dashboardDataReducer } from './reducers/dashboardReducers';

const reducers = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	productCreateReview: productCreateReviewReducer,
	productCreateAdmin: productCreateAdminReducer,
	productEditAdmin: productEditAdminReducer,
	productDeleteAdmin: productDeleteAdminReducer,
	cart: cartReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userDetails: userDetailsReducer,
	userUpdateProfile: userUpdateProfileReducer,
	userDetailsAdmin: userDetailsAdminReducer,
	userEditAdmin: userEditAdminReducer,
	userDeleteAdmin: userDeleteAdminReducer,
	userListAdmin: userListAdminReducer,
	requestDoctorContact: requestDoctorContactReducer,
	registerDoctor: registerDoctorReducer,
	doctorsList: doctorsListReducer,
	doctorDetails: doctorDetailsReducer,
	getProfessionalInfo: getProfessionalInfoReducer,
	updateProfessionalInfo: updateProfessionalInfoReducer,
	doctorCreateReview: doctorCreateReviewReducer,
	doctorToggleVerification: doctorToggleVerificationReducer,
	registerPatient: registerPatientReducer,
	patientDetails: patientDetailsReducer,
	patientsList: patientsListReducer,
	patientAllRequests: patientAllRequestsReducer,
	acceptedDoctors: acceptedDoctorsReducer,
	getMedicalInfo: getMedicalInfoReducer,
	updateMedicalInfo: updateMedicalInfoReducer,
	acceptPatientRequest: acceptPatientRequestReducer,
	conversationsList: conversationsListReducer,
	createConversation: createConversationReducer,
	chatMessages: chatMessagesReducer,
	sendMessage: sendMessageReducer,
	orderCreate: orderCreateReducer,
	orderDetails: orderDetailsReducer,
	myOrdersList: myOrdersListReducer,
	orderPay: orderPayReducer,
	orderDeliver: orderDeliverReducer,
	getOrdersAdmin: getOrdersAdminReducer,
	lungsPrediction: lungsPredictionReducer,
	diseasePrediction: diseasePredictionReducer,
	dashboardData: dashboardDataReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null;

const cartItemsFromStorage = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems'))
	: [];

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
	? JSON.parse(localStorage.getItem('shippingAddress'))
	: null;

const paymentMethodFromStorage = localStorage.getItem('paymentMethod')
	? JSON.parse(localStorage.getItem('paymentMethod'))
	: '';

const initialState = {
	userLogin: { userInfo: userInfoFromStorage },
	cart: {
		cartItems: cartItemsFromStorage,
		shippingAddress: shippingAddressFromStorage,
		paymentMethod: paymentMethodFromStorage,
	},
};

const middleware = [thunk];

const store = createStore(
	reducers,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
