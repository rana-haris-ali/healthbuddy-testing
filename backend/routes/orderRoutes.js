import express from 'express';

import { protect } from '../middleware/authMiddleware.js';
import {
	createOrder,
	getOrder,
	updateOrderToPaid,
	getMyOrders,
} from '../controllers/orderController.js';

const router = express.Router();

router.route('/').post(protect, createOrder);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrder);
router.route('/:id/pay').put(protect, updateOrderToPaid);

export default router;
