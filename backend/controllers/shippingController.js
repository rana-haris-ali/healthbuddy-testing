import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const getShippingAddress = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user && user.shippingAddress.address !== undefined) {
		// check if shipping address exists
		res.json(user.shippingAddress);
	} else {
		res.status(404);
		throw new Error('Address Not Found');
	}
});

const updateShippingAddress = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		user.shippingAddress = {
			address: req.body.address,
			city: req.body.city,
			postalCode: req.body.postalCode,
			country: req.body.country,
		};
		const updatedUser = await user.save();
		res.json(updatedUser.shippingAddress);
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

export { getShippingAddress, updateShippingAddress };
