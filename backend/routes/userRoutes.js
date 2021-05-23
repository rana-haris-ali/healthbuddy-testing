import express from 'express';

import { protect } from '../middleware/authMiddleware.js';
import {
	authUser,
	registerUser,
	getUserProfile,
	updateUserProfile,
} from '../controllers/userController.js';
import {
	getShippingAddress,
	updateShippingAddress,
} from '../controllers/shippingController.js';

const router = express.Router();

router.route('/').post(registerUser);
router.post('/login', authUser);
router
	.route('/profile')
	.get(protect, getUserProfile)
	.put(protect, updateUserProfile);

router
	.route('/shipping')
	.get(protect, getShippingAddress)
	.put(protect, updateShippingAddress);

export default router;
