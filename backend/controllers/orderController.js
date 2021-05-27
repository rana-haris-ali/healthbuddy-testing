import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

// @desc create new order
//  @route POST /api/orders
// @access Private
const createOrder = asyncHandler(async (req, res) => {
	const {
		orderItems,
		shippingAddress,
		paymentMethod,
		netAmount,
		shippingAmount,
		taxAmount,
		totalAmount,
	} = req.body;

	if (orderItems && orderItems.length === 0) {
		res.status(400);
		throw new Error('No order items');
	} else {
		const order = new Order({
			orderItems,
			user: req.user._id,
			shippingAddress,
			paymentMethod,
			netAmount,
			shippingAmount,
			taxAmount,
			totalAmount,
		});
		try {
			const savedOrder = await order.save();
			res.status(201).json(savedOrder);
		} catch (error) {
			res.status(500);
			throw new Error('Unable to save order');
		}
	}
});

// @desc GET an order
//  @route GET /api/orders/:id
// @access Private
const getOrder = asyncHandler(async (req, res) => {
	const orderId = req.params.id;

	const order = await Order.findById(orderId).populate('user', 'name email');

	if (order) {
		res.json(order);
	} else {
		res.status(404);
		throw new Error('Order not found');
	}
});

export { createOrder, getOrder };
