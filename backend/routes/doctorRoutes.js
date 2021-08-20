import express from 'express';
import {
	getAllDoctors,
	registerDoctor,
} from '../controllers/doctorController.js';
import { protect, adminAuth } from '../middleware/authMiddleware.js';

// /api/doctors

const router = express.Router();

router.route('/').get(protect, getAllDoctors).post(protect, registerDoctor);

export default router;
