import express from 'express';
import {
	getSingleDoctor,
	getAllDoctors,
	registerDoctor,
	getAllPatients,
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

router.route('/').get(getAllDoctors).post(protect, registerDoctor);

router.route('/all-patients').get(protect, doctorAuth, getAllPatients);

router.route('/:id').get(getSingleDoctor);

router.route('/:id/request').get(protect, requestDoctorContact);

export default router;
