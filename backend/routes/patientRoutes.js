import express from 'express';
import {
	protect,
	adminAuth,
	patientAuth,
	doctorAuth,
} from '../middleware/authMiddleware.js';

import {
	registerPatient,
	getPatientById,
	patientGetAllRequests,
	patientGetAllAcceptedRequests,
	patientGetAcceptedDoctors,
	getTotalPatientsNumber,
	getMedicalInfo,
	updateMedicalInfo,
} from '../controllers/patientController.js';
import { acceptPatientRequest } from '../controllers/doctorController.js';

// import { protect, adminAuth } from '../middleware/authMiddleware.js';

// /api/patients

const router = express.Router();

router.route('/').post(registerPatient);

router.route('/requests').get(protect, patientAuth, patientGetAllRequests);

router
	.route('/requests/accepted')
	.get(protect, patientAuth, patientGetAllAcceptedRequests);

router
	.route('/doctors/accepted')
	.get(protect, patientAuth, patientGetAcceptedDoctors);

router
	.route('/requests/:id/approve')
	.get(protect, doctorAuth, acceptPatientRequest);

// get total number of patients for dashboard
router.route('/number').get(getTotalPatientsNumber);

router
	.route('/medical-info')
	.get(protect, patientAuth, getMedicalInfo)
	.put(protect, patientAuth, updateMedicalInfo);

router.route('/:id').get(protect, doctorAuth, getPatientById);

export default router;
