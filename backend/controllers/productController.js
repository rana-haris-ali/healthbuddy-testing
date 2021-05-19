import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc Fetch all products
//  @route GET /api/products
// @access Public
const getAllProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({});

	res.json(products);
});

// @desc Fetch single products
//  @route GET /api/products/:id
// @access Public
const getSingleProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		res.json(product);
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});

export { getAllProducts, getSingleProduct };
