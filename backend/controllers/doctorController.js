import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import Doctor from '../models/doctorModel.js';
import generateToken from '../utils/generateToken.js';

// @desc Register new doctor
//  @route POST /api/doctors
// @access PUBLIC
const registerDoctor = asyncHandler(async (req, res) => {
	const { name, email, password, degrees } = req.body;

	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error('User already exists');
	}

	try {
		// register base User
		const user = await User.create({
			name,
			email,
			password,
			role: 'Doctor',
		});

		// register Doctor and add reference to User document already created
		const doctor = await Doctor.create({
			user: user._id,
			degrees,
		});

		// add Doctor reference to User document
		const updatedUser = await User.updateOne(
			{ _id: user._id },
			{ roleId: doctor._id }
		);

		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			role: user.role,
			token: generateToken(user._id),
		});
	} catch (error) {
		res.status(500);
		console.log(error);
		throw new Error(error);
	}
});

// @desc Get SINGLE doctor
//  @route GET /api/doctors/:id
// @access PUBLIC
const getSingleDoctor = asyncHandler(async (req, res) => {
	try {
		const doctor = await Doctor.findById(req.params.id).populate(
			'user',
			'name email'
		);
		res.status(200).json(doctor);
	} catch (error) {
		res.status(500);
		console.log(error);
		throw new Error(error);
	}
});

// @desc Get all doctors
//  @route GET /api/doctors
// @access PUBLIC
const getAllDoctors = asyncHandler(async (req, res) => {
	try {
		const doctors = await Doctor.find({}).populate('user', 'name email');
		res.status(200).json(doctors);
	} catch (error) {
		res.status(500);
		console.log(error);
		throw new Error(error);
	}
});

export { getSingleDoctor, getAllDoctors, registerDoctor };
