import express from 'express';

import { protect, adminAuth } from '../middleware/authMiddleware.js';

import {
	getAllProducts,
	getSingleProduct,
	deleteProduct,
} from '../controllers/productController.js';

// ROOT route = /api/products

const router = express.Router();

// all products route
router.route('/').get(getAllProducts);

// single product route
router
	.route('/:id')
	.get(getSingleProduct)
	.delete(protect, adminAuth, deleteProduct);

export default router;
