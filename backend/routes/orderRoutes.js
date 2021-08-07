import express from 'express';

import { adminAuth, protect } from '../middleware/authMiddleware.js';
import {
	createOrder,
	getOrder,
	updateOrderToPaid,
	getMyOrders,
	getAllOrders,
	updateOrderToDelivered,
} from '../controllers/orderController.js';

const router = express.Router();

router
	.route('/')
	.post(protect, createOrder)
	.get(protect, adminAuth, getAllOrders);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrder);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, adminAuth, updateOrderToDelivered);

export default router;
