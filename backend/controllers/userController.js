import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc Authenticate User and get token
//  @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			role: user.role,
			roleId: user.roleId,
			token: generateToken(user._id),
		});
	} else {
		res.status(401);
		throw new Error('Invalid email or password');
	}
});

// @desc Register new user
//  @route POST /api/users
// @access PUBLIC
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error('User already exists');
	}
	const user = await User.create({
		name,
		email,
		password,
	});

	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error('Invalid user data');
	}
});

// @desc Get user profile
//  @route GET /api/users/profile
// @access PRIVATE
const getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			role: user.role,
			roleId: user.roleId,
			isAdmin: user.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

// @desc Get user details by roleId
//  @route GET /api/users/roleId/:roleId
// @access PRIVATE
const getUserByRoleId = asyncHandler(async (req, res) => {
	const user = await User.findOne({ roleId: req.params.roleId }).select(
		'name email role roleId'
	);
	if (user) {
		res.status(200).json(user);
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

// @desc Update user profile
//  @route PUT /api/users/profile
// @access PRIVATE
const updateUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		if (req.body.password) {
			user.password = req.body.password;
		}
		const updatedUser = await user.save();
		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
			token: generateToken(updatedUser._id),
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

// ADMIN ROUTES

// @desc Get single user
//  @route GET /api/users/:id
// @access PRIVATE
// @privilege ADMIN
const getSingleUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id).select('-password');
	if (user) {
		res.json(user);
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

// @desc Get all users
//  @route GET /api/users
// @access PRIVATE
// @privilege ADMIN
const getAllUsers = asyncHandler(async (req, res) => {
	// return all accounts except the one that the admin is logged in with
	const users = await User.find({ _id: { $ne: req.user._id } }).select(
		'-password'
	);
	res.json(users);
});

// @desc Update a user
//  @route PUT /api/users/:id
// @access PRIVATE
// @privilege ADMIN
const updateSingleUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id).select('-password');

	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		user.isAdmin = req.body.isAdmin;
		const updatedUser = await user.save();
		res.json(updatedUser);
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

// @desc Delete a user
//  @route DELETE /api/users/:id
// @access PRIVATE
// @privilege ADMIN
const deleteUser = asyncHandler(async (req, res) => {
	const user = await User.findById({ _id: req.params.id });
	if (user) {
		await user.remove();
		res.json({ message: 'User deleted successfully' });
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

export {
	authUser,
	getUserProfile,
	registerUser,
	updateUserProfile,
	getUserByRoleId,
	getSingleUser,
	getAllUsers,
	updateSingleUser,
	deleteUser,
};
