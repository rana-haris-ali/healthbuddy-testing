import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

// protect function verifies that the http request
// contains a token and if it does then it verifies it
const protect = asyncHandler(async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			token = req.headers.authorization.split(' ')[1];
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			req.user = await User.findById(decoded.id).select('-password');
			next();
		} catch (error) {
			console.error(error);
			res.status(401);
			throw new Error('Unauthorized, token failed or expired');
		}
	}
	if (!token) {
		res.status(401);
		throw new Error('Unauthorized, no token');
	}
});

// check if user is admin

const adminAuth = (req, res, next) => {
	if (req.user && req.user.isAdmin) {
		next();
	} else {
		res.status(401);
		throw new Error('Not authorized as admin');
	}
};

// check if user is Patient
const patientAuth = (req, res, next) => {
	if (req.user && req.user.role === 'Patient') {
		next();
	} else {
		res.status(401);
		throw new Error('Only patients can access this resource');
	}
};

// check if user is Doctor
const doctorAuth = (req, res, next) => {
	if (req.user && req.user.role === 'Doctor') {
		next();
	} else {
		res.status(401);
		throw new Error('Only doctors can access this resource');
	}
};

export { protect, adminAuth, patientAuth, doctorAuth };
