import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc Fetch all products
//  @route GET /api/products
// @access Public
const getAllProducts = asyncHandler(async (req, res) => {
	// number of products shown on a single page
	const pageSize = Number(process.env.PAGE_SIZE);
	// return results depending on which page the user is viewing currently
	const currentPageNumber = Number(req.query.pageNumber) || 1;

	// if  a search keyword is passed then save it in this variable
	const keyword = req.query.keyword
		? {
				name: {
					$regex: req.query.keyword,
					$options: 'i',
				},
		  }
		: {};

	// total number of products
	const count = await Product.countDocuments({ ...keyword });

	const products = await Product.find({ ...keyword })
		.limit(pageSize)
		.skip(pageSize * (currentPageNumber - 1));

	res.json({
		products,
		currentPageNumber,
		totalPages: Math.ceil(count / pageSize),
	});
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

// @desc Review product
//  @route POST /api/products/:id/reviews
// @access Private

const addProductReview = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	const { rating, comment } = req.body;

	if (product) {
		const alreadyReviewed = product.reviews.find(
			(r) => r.user.toString() === req.user._id.toString()
		);

		if (alreadyReviewed) {
			// if user has already reviewed the product then throw error
			res.status(400);
			throw new Error('Product already reviewed');
		}

		const review = {
			name: req.user.name,
			rating: Number(rating),
			comment,
			user: req.user._id,
		};

		product.reviews.push(review);
		product.numReviews = product.reviews.length;
		product.rating =
			product.reviews.reduce((acc, item) => item.rating + acc, 0) /
			product.reviews.length;

		await product.save();
		res.status(201).json({ message: 'Review has been added' });
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});

// ADMIN ROUTES

// @desc CREATE single product
//  @route POST /api/products
// @access Private
// @privilige ADMIN

const createProduct = asyncHandler(async (req, res) => {
	try {
		const createdProduct = await Product.create({
			...req.body,
			user: req.user._id,
		});
		res.status(201).json(createdProduct);
	} catch (error) {
		res.status(500);
		throw new Error('Product could not be created. Try again later');
	}
});

// @desc EDIT single product
//  @route PUT /api/products/:id
// @access Private
// @privilige ADMIN

const editProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		try {
			product.name = req.body.name || product.name;
			product.image = req.body.image || product.image;
			product.brand = req.body.brand || product.brand;
			product.category = req.body.category || product.category;
			product.description = req.body.description || product.description;
			product.price = req.body.price || product.price;
			product.countInStock = req.body.countInStock || product.countInStock;

			const updatedProduct = await product.save();
			res.status(200).json(updatedProduct);
		} catch (error) {
			res.status(500);
			throw new Error(
				'An error occured while updating the product. Please try again later'
			);
		}
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});

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

export {
	getAllProducts,
	getSingleProduct,
	addProductReview,
	createProduct,
	editProduct,
	deleteProduct,
};
