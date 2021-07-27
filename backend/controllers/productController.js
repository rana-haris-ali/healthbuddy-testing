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

// ADMIN ROUTES

// @desc DELETE single product
//  @route DELETE /api/products/:id
// @access Private
// @privilige ADMIN

const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		if (String(product.user._id) === String(req.user._id)) {
			product.remove();
			res.status(200);
			res.json({ message: 'Product has been deleted successfully' });
		} else {
			res.status(403);
			throw new Error(
				"User don't have privilige of deleting this product. Either the user is not an admin or the product was not created by this admin user."
			);
		}
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});

export { getAllProducts, getSingleProduct, deleteProduct };
