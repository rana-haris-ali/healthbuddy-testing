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
		const updatedUser = await User.updateOne(
			{ _id: user._id },
			{ roleId: patient._id }
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
		const [patient] = await Patient.find({ user: req.user._id });

		const request = new Request({
			patient: patient._id,
			user: patient.user,
			doctor: req.params.id,
		});
		request.save();

		const doctor = await Doctor.findById(req.params.id);
		doctor.patientRequests.push(request._id);
		await doctor.save();

		res.status(201).json({ message: 'Request Sent' });
	} catch (error) {
		res.status(500);
		console.log(error);
		throw new Error(error);
	}
});

export { registerPatient, requestDoctorContact };
