import express from 'express';
import {
	getSingleDoctor,
	getAllDoctors,
	registerDoctor,
} from '../controllers/doctorController.js';
import { protect, adminAuth } from '../middleware/authMiddleware.js';

// /api/doctors

const router = express.Router();

router.route('/').get(getAllDoctors).post(protect, registerDoctor);

router.route('/:id').get(getSingleDoctor);

export default router;
