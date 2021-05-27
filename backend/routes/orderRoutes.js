import express from 'express';

import { protect } from '../middleware/authMiddleware.js';
import { createOrder, getOrder } from '../controllers/orderController.js';

const router = express.Router();

router.route('/').post(protect, createOrder);
router.route('/:id').get(protect, getOrder);

export default router;
