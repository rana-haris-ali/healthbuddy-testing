import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

// shows links for navigation between specified steps like login shipping payment etc
const CheckoutSteps = ({ steps, disabledSteps, currentStep }) => {
	return (
		<Nav className='justify-content-center mb-4'>
			{steps.map((step) => {
				return (
					<Nav.Item key={step.name}>
						<LinkContainer to={step.link}>
							{/* disable step if included in disabled steps array */}
							<Nav.Link disabled={disabledSteps.includes(step.name)}>
								<p
									style={step.name === currentStep ? { color: 'black' } : null}
								>
									{step.name}
								</p>
							</Nav.Link>
						</LinkContainer>
					</Nav.Item>
				);
			})}
		</Nav>
	);
};

export default CheckoutSteps;
