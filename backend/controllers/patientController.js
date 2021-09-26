import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import Patient from '../models/patientModel.js';
import Doctor from '../models/doctorModel.js';
import Request from '../models/requestModel.js';
import generateToken from '../utils/generateToken.js';

// @desc Register new patient
//  @route POST /api/patients
// @access PUBLIC
const registerPatient = asyncHandler(async (req, res) => {
	const { name, email, password, diseases } = req.body;

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
			role: 'Patient',
		});

		// register Patient and add reference to User document already created
		const patient = await Patient.create({
			user: user._id,
			diseases,
		});

		// add Patient reference to User document
		const updatedUser = await User.findByIdAndUpdate(
			user._id,
			{ roleId: patient._id },
			{ new: true }
		);

		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			role: user.role,
			roleId: updatedUser.roleId,
			token: generateToken(user._id),
		});
	} catch (error) {
		res.status(500);
		console.log(error);
		throw new Error(error);
	}
});

// @desc Get all requests (pending + accepted) made by a patient
//  @route GET /api/patients/requests
// @access Private
const patientGetAllRequests = asyncHandler(async (req, res) => {
	try {
		const requests = await Request.find({ user: req.user._id }).populate({
			path: 'doctor',
			populate: { path: 'user', select: '-_id name email' },
		});
		res.status(200).json(requests);
	} catch (error) {
		res.status(500);
		console.log(error);
		throw new Error(error);
	}
});

// @desc Request for doctor contact
//  @route GET /api/doctors/:id/request
// @access Private
const requestDoctorContact = asyncHandler(async (req, res) => {
	const { role } = await User.findById(req.user._id);

	if (role === 'Doctor') {
		res.status(400);
		throw new Error('Only patients can contact other doctors');
	}

	try {
		const patient = await Patient.findOne({ user: req.user._id });

		const request = new Request({
			patient: patient._id,
			user: patient.user,
			doctor: req.params.id,
		});
		request.save();

		res.status(201).json({ message: 'Request Sent' });
	} catch (error) {
		res.status(500);
		console.log(error);
		throw new Error(error);
	}
});

// @desc Get all accepted requests of a patient
//  @route GET /api/patients/requests/accepted
// @access Private
const patientGetAllAcceptedRequests = asyncHandler(async (req, res) => {
	try {
		const requests = await Request.find({
			user: req.user._id,
			status: 'Accepted',
		}).populate({
			path: 'doctor',
			populate: { path: 'user', select: '-_id name email' },
		});
		res.status(200).json(requests);
	} catch (error) {
		res.status(500);
		console.log(error);
		throw new Error(error);
	}
});

// @desc Get accepted doctors of a patient
//  @route GET /api/patients/doctors/accepted
// @access Private
const patientGetAcceptedDoctors = asyncHandler(async (req, res) => {
	try {
		const { acceptedDoctors } = await Patient.findById(req.user.roleId).select(
			'acceptedDoctors -_id'
		);

		if (acceptedDoctors.length > 0) {
			// populate acceptedDoctors with names
			let populatedAcceptedDoctorsArray = await Promise.all(
				acceptedDoctors.map(async (doctor) => {
					try {
						return await Doctor.findById(doctor)
							.select('user')
							.populate({ path: 'user', select: '-_id name' });
					} catch (error) {
						res.status(500);
						console.log(error);
						throw new Error(error);
					}
				})
			);

			res.status(200).json(populatedAcceptedDoctorsArray);
		} else {
			res.status(404);
			throw new Error('There are no accepted doctors for this patient');
		}
	} catch (error) {
		res.status(500);
		console.log(error);
		throw new Error(error);
	}
});

export {
	registerPatient,
	requestDoctorContact,
	patientGetAllRequests,
	patientGetAllAcceptedRequests,
	patientGetAcceptedDoctors,
};
