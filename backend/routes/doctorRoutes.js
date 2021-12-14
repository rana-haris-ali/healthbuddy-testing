import express from 'express';
import {
	getSingleDoctor,
	getAllDoctors,
	registerDoctor,
	getAllPatients,
	getDoctorProfessionalInfo,
	updateDoctorProfessionalInfo,
	getTotalDoctorsNumber,
	addDoctorReview,
	toggleDoctorVerification,
} from '../controllers/doctorController.js';
import { requestDoctorContact } from '../controllers/patientController.js';
import {
	protect,
	adminAuth,
	patientAuth,
	doctorAuth,
} from '../middleware/authMiddleware.js';

// /api/doctors

const router = express.Router();

router.route('/').get(getAllDoctors).post(registerDoctor);

router.route('/all-patients').get(protect, doctorAuth, getAllPatients);

// get total number of doctors for dashboard
router.route('/number').get(getTotalDoctorsNumber);

router
	.route('/professional-info')
	.get(protect, doctorAuth, getDoctorProfessionalInfo)
	.put(protect, doctorAuth, updateDoctorProfessionalInfo);

router.route('/:id').get(getSingleDoctor);

router.route('/:id/request').get(protect, requestDoctorContact);

router.route('/:id/reviews').post(protect, patientAuth, addDoctorReview);
router
	.route('/:id/toggle-verification')
	.put(protect, adminAuth, toggleDoctorVerification);

export default router;
