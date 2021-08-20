import express from 'express';
import { registerPatient } from '../controllers/patientController.js';

// import { protect, adminAuth } from '../middleware/authMiddleware.js';

// /api/patients

const router = express.Router();

router.route('/').post(registerPatient);

export default router;
