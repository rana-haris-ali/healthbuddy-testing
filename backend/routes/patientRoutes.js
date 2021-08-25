import express from 'express';
import { protect, adminAuth } from '../middleware/authMiddleware.js';

import { registerPatient } from '../controllers/patientController.js';
import { acceptPatientRequest } from '../controllers/doctorController.js';

// import { protect, adminAuth } from '../middleware/authMiddleware.js';

// /api/patients

const router = express.Router();

router.route('/').post(registerPatient);

router.route('/:id/approve').get(protect, acceptPatientRequest);

export default router;
