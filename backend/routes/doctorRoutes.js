import express from 'express';
import {
	getSingleDoctor,
	getAllDoctors,
	registerDoctor,
	getAllPatients,
	getDoctorProfessionalInfo,
	updateDoctorProfessionalInfo,
	getTotalDoctorsNumber,
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

router.route('/number').get(getTotalDoctorsNumber);

router
	.route('/professional-info')
	.get(protect, doctorAuth, getDoctorProfessionalInfo)
	.put(protect, doctorAuth, updateDoctorProfessionalInfo);

router.route('/:id').get(getSingleDoctor);

router.route('/:id/request').get(protect, requestDoctorContact);

// get total number of doctors for dashboard

export default router;
