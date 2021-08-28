import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import Patient from '../models/patientModel.js';
import Doctor from '../models/doctorModel.js';
import Request from '../models/requestModel.js';
import generateToken from '../utils/generateToken.js';
import { request } from 'express';

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

// @desc Show all contact requests sent by patients to a doctor
//  @route GET /api/doctors/all-patients
// @access PRIVATE
const getAllPatients = asyncHandler(async (req, res) => {
	try {
		const doctor = await Doctor.findOne({ user: req.user._id });

		const pendingPatientRequests = await Request.find({
			doctor: doctor._id,
			status: 'Pending',
		}).populate('user', '-_id name email');

		const acceptedPatientRequests = await Request.find({
			doctor: doctor._id,
			status: 'Accepted',
		}).populate('user', '-_id name email');

		res.status(200).json({
			pendingPatientRequests,
			acceptedPatientRequests,
		});
	} catch (error) {
		res.status(500);
		console.log(error);
		throw new Error(error);
	}
});

// @desc Approve contact request of a patient
//  @route GET /api/patients/requests/:id/approve
// @access PRIVATE
const acceptPatientRequest = asyncHandler(async (req, res) => {
	try {
		const updatedRequest = await Request.findOneAndUpdate(
			{ _id: req.params.id },
			{ $set: { status: 'Accepted' } },
			{ new: true }
		);

		if (updatedRequest) {
			res.status(200).json({ message: 'Patient request accepted' });
		} else {
			res.status(404);
			throw new Error('The patient request was not found');
		}
	} catch (error) {
		res.status(500);
		console.log(error);
		throw new Error(error);
	}
});

export {
	getSingleDoctor,
	getAllDoctors,
	registerDoctor,
	getAllPatients,
	acceptPatientRequest,
};
