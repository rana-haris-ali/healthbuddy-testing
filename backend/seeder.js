import mongoose from 'mongoose';
import colors from 'colors';
import dotenv from 'dotenv';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import Patient from './models/patientModel.js';
import Doctor from './models/doctorModel.js';
import Request from './models/requestModel.js';
import Conversation from './models/conversationModel.js';
import Message from './models/messageModel.js';
import connectDB from './config/db.js';

dotenv.config({ path: '../.env' });

connectDB();

const importData = async () => {
	try {
		await User.deleteMany();
		await Product.deleteMany();
		await Order.deleteMany();

		const insertedUsers = await User.insertMany(users);

		// admin user is the first user entry
		const adminUserID = insertedUsers[0]._id;

		const productsWithAdmin = products.map((product) => {
			return { ...product, user: adminUserID };
		});

		await Product.insertMany(productsWithAdmin);

		console.log('Data Imported'.green);
		process.exit();
	} catch (error) {
		console.log(`Error: ${error}`.red);
		process.exit(1);
	}
};

const deleteData = async () => {
	try {
		await User.deleteMany();
		await Product.deleteMany();
		await Order.deleteMany();
		await Patient.deleteMany();
		await Doctor.deleteMany();
		await Request.deleteMany();
		await Conversation.deleteMany();
		await Message.deleteMany();

		console.log('Data deleted'.yellow);
		process.exit();
	} catch (error) {
		console.log(`Error: ${error}`.red);
		process.exit(1);
	}
};

const deleteAllExceptAccounts = async () => {
	try {
		await Product.deleteMany();
		await Order.deleteMany();
		await Request.deleteMany();
		await Conversation.deleteMany();
		await Message.deleteMany();

		console.log('Everything deleted except accounts'.yellow);
		process.exit();
	} catch (error) {
		console.log(`Error: ${error}`.red);
		process.exit(1);
	}
};

const deleteMessages = async () => {
	try {
		await Message.deleteMany();

		console.log('All messages deleted'.yellow);
		process.exit();
	} catch (error) {
		console.log(`Error: ${error}`.red);
		process.exit(1);
	}
};

const deleteMessagesAndConversations = async () => {
	try {
		await Conversation.deleteMany();
		await Message.deleteMany();

		console.log('Messages And Conversations deleted'.yellow);
		process.exit();
	} catch (error) {
		console.log(`Error: ${error}`.red);
		process.exit(1);
	}
};

if (process.argv[2] === '-d') {
	deleteData();
} else if (process.argv[2] === '-aea') {
	deleteAllExceptAccounts();
} else if (process.argv[2] === '-mc') {
	deleteMessagesAndConversations();
} else if (process.argv[2] === '-m') {
	deleteMessages();
} else {
	importData();
}
