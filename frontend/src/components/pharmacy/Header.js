import React from 'react';
import { Route } from 'react-router-dom';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import SearchBox from '../SearchBox';
import { logout } from '../../actions/pharmacy/userActions';

// Header for ePharmacy with navbar

const Header = () => {
	const dispatch = useDispatch();
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const logoutHandler = () => {
		dispatch(logout());
	};

	return (
		<header>
			<Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
				<Container>
					<LinkContainer to='/'>
						<Navbar.Brand>HealthBuddy</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Route render={({ history }) => <SearchBox history={history} />} />
						<Nav className='ml-auto'>
							<LinkContainer to='/doctors'>
								<Nav.Link>Doctors</Nav.Link>
							</LinkContainer>
							{/* show patients of a doctor */}
							{userInfo && userInfo.role === 'Doctor' && (
								<LinkContainer to='/patients'>
									<Nav.Link>Patients</Nav.Link>
								</LinkContainer>
							)}
							{/* show all requests of a patient */}
							{userInfo && userInfo.role === 'Patient' && (
								<LinkContainer to='/patients/requests'>
									<Nav.Link>Requests</Nav.Link>
								</LinkContainer>
							)}

							<LinkContainer to='/messenger'>
								<Nav.Link>Messenger</Nav.Link>
							</LinkContainer>

							<LinkContainer to='/pharmacy-home'>
								<Nav.Link>
									<i className='fas fa-file-prescription'></i> Pharmacy
								</Nav.Link>
							</LinkContainer>

							<LinkContainer to='/cart'>
								<Nav.Link>
									<i className='fas fa-shopping-cart'></i> Cart
								</Nav.Link>
							</LinkContainer>

							<NavDropdown title='Prediction' id='prediction'>
								<LinkContainer to='/disease-prediction'>
									<NavDropdown.Item>
										Disease Prediction from Symptoms
									</NavDropdown.Item>
								</LinkContainer>
								<LinkContainer to='/lungs-prediction'>
									<NavDropdown.Item>
										Lungs Irregularity Prediction
									</NavDropdown.Item>
								</LinkContainer>
							</NavDropdown>

							{/* <LinkContainer to='/lungs-prediction'>
								<Nav.Link>Prediction</Nav.Link>
							</LinkContainer> */}

							{/* show register links if user is not logged in */}
							{!userInfo && (
								<NavDropdown alignRight='true' title='Register' id='username'>
									<LinkContainer to='/register-patient'>
										<NavDropdown.Item>Patient</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to='/register-doctor'>
										<NavDropdown.Item>Doctor</NavDropdown.Item>
									</LinkContainer>
								</NavDropdown>
							)}

							{/* if user is logged in, show dropdown else show login link  */}
							{userInfo ? (
								<NavDropdown
									alignRight='true'
									title={userInfo.name}
									id='username'
								>
									<LinkContainer to='/orders'>
										<NavDropdown.Item>Orders</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to='/profile'>
										<NavDropdown.Item>Profile</NavDropdown.Item>
									</LinkContainer>
									<NavDropdown.Item onClick={logoutHandler}>
										Logout
									</NavDropdown.Item>
								</NavDropdown>
							) : (
								<LinkContainer to='/login'>
									<Nav.Link>
										<i className='fas fa-user'></i> Login
									</Nav.Link>
								</LinkContainer>
							)}

							{userInfo && userInfo.isAdmin && (
								<NavDropdown alignRight='true' title='Admin' id='adminMenu'>
									<LinkContainer to='/admin/userList'>
										<NavDropdown.Item>Users</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to='/admin/orderList'>
										<NavDropdown.Item>Orders</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to='/admin/productList'>
										<NavDropdown.Item>Products</NavDropdown.Item>
									</LinkContainer>
								</NavDropdown>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
