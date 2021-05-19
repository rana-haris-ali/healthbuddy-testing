import express from 'express';

import {
	getAllProducts,
	getSingleProduct,
} from '../controllers/productController.js';

const router = express.Router();

// all products route
router.route('/').get(getAllProducts);

// single product route
router.route('/:id').get(getSingleProduct);

export default router;
