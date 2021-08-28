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

		console.log('Data deleted'.yellow);
		process.exit();
	} catch (error) {
		console.log(`Error: ${error}`.red);
		process.exit(1);
	}
};
if (process.argv[2] === '-d') {
	deleteData();
} else {
	importData();
}
