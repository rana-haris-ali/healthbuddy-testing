import express from 'express';
import {
	protect,
	adminAuth,
	patientAuth,
	doctorAuth,
} from '../middleware/authMiddleware.js';

import {
	registerPatient,
	patientGetAllRequests,
	patientGetAllAcceptedRequests,
	patientGetAcceptedDoctors,
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

export default router;
