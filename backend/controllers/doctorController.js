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
	const { name, email, password, degrees, coordinates } = req.body;

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
			coordinates,
		});

		// add Doctor reference to User document
		const updatedUser = await User.findByIdAndUpdate(
			user._id,
			{ roleId: doctor._id },
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
		const request = await Request.findById(req.params.id);

		const patient = await Patient.findById(request?.patient);

		if (!request) {
			res.status(404);
			throw new Error('The patient request was not found');
		} else if (request.status === 'Accepted') {
			res.status(401);
			throw new Error('The patient request is already accepted');
		} else if (patient.acceptedDoctors.includes(request.doctor)) {
			res.status(401);
			throw new Error('The doctor is already present in acceptedDoctors list');
		}

		request.status = 'Accepted';
		request.save();

		patient.acceptedDoctors.push(request.doctor);
		patient.save();

		res.status(200).json({ message: 'Patient request accepted' });
	} catch (error) {
		res.status(500);
		console.log(error);
		throw new Error(error);
	}
});

// @desc Get professional info of doctor (for doctor profile screen)
//  @route GET /api/doctors/professional-info
// @access Public
const getDoctorProfessionalInfo = asyncHandler(async (req, res) => {
	try {
		const professionalInfo = await Doctor.findById(req.user.roleId).select(
			'degrees -_id'
		);
		res.status(200).json(professionalInfo);
	} catch (error) {
		res.status(500);
		console.log(error);
		throw new Error(error);
	}
});

// @desc Update professional info of doctor (for profile screen)
//  @route PUT /api/doctors/professional-info
// @access Private
const updateDoctorProfessionalInfo = asyncHandler(async (req, res) => {
	try {
		const updateValues = req.body;
		await Doctor.findByIdAndUpdate(req.user.roleId, updateValues);
		res.status(200).json({ success: true });
	} catch (error) {
		res.status(500);
		console.log(error);
		throw new Error(error);
	}
});

// @desc Get total number of registered doctors (for dashboard)
//  @route GET /api/doctors/number
// @access Public
const getTotalDoctorsNumber = asyncHandler(async (req, res) => {
	try {
		const numberOfDoctors = await Doctor.countDocuments({});
		res.status(200).json(numberOfDoctors);
	} catch (error) {
		res.status(500);
		console.log(error);
		throw new Error(error);
	}
});

// / @desc Review doctor
//  @route POST /api/doctors/:id/reviews
// @access Private

const addDoctorReview = asyncHandler(async (req, res) => {
	const doctor = await Doctor.findById(req.params.id);

	const { rating, comment } = req.body;

	// find whether user has already reviewed doctor
	if (doctor) {
		const alreadyReviewed = doctor.reviews.find(
			(r) => r.user.toString() === req.user._id.toString()
		);

		if (alreadyReviewed) {
			// if user has already reviewed the doctor then throw error
			res.status(400);
			throw new Error('Doctor already reviewed');
		}

		const review = {
			name: req.user.name,
			rating: Number(rating),
			comment,
			user: req.user._id,
		};

		doctor.reviews.push(review);
		doctor.numReviews = doctor.reviews.length;
		doctor.rating =
			doctor.reviews.reduce((acc, item) => item.rating + acc, 0) /
			doctor.reviews.length;

		await doctor.save();
		res.status(201).json({ message: 'Review has been added' });
	} else {
		res.status(404);
		throw new Error('Doctor not found');
	}
});

// Privilige ADMIN
// / @desc toggle doctor verification (unverify to verify, verify to unverify)
//  @route POST /api/doctors/:id/toggle-verification
// @access ADMIN

const toggleDoctorVerification = asyncHandler(async (req, res) => {
	const doctor = await Doctor.findById(req.params.id);
	let message;
	// find whether user has already reviewed doctor
	if (doctor) {
		if (doctor.isVerified === true) {
			message = 'Status successfully set to UnVerified';
		} else if (doctor.isVerified === false) {
			message = 'Status successfully set to Verified';
		}
		doctor.isVerified = !doctor.isVerified;
		await doctor.save();
		res.status(201).json({ message });
	} else {
		res.status(404);
		throw new Error('Doctor not found');
	}
});

export {
	getSingleDoctor,
	getAllDoctors,
	registerDoctor,
	getAllPatients,
	acceptPatientRequest,
	getDoctorProfessionalInfo,
	updateDoctorProfessionalInfo,
	getTotalDoctorsNumber,
	addDoctorReview,
	toggleDoctorVerification,
};
