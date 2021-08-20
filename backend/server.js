import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import colors from 'colors';
import morgan from 'morgan';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import patientRoutes from './routes/patientRoutes.js';
import doctorRoutes from './routes/doctorRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

dotenv.config();

connectDB();

const app = express();

// if (process.env.NODE_ENV === 'development') {
// 	app.use(morgan('dev'));
// }

// allow app to accept json data in body
app.use(express.json());

// create static uploads folder
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.get('/', (req, res) => {
	res.send('healthbuddy');
});

// products endpoint
app.use('/api/products', productRoutes);

// users endpoint
app.use('/api/users', userRoutes);

// patients endpoint
app.use('/api/patients', patientRoutes);

// doctors endpoint
app.use('/api/doctors', doctorRoutes);

// orders endpoint
app.use('/api/orders', orderRoutes);

// uploads endpoint
app.use('/api/uploads', uploadRoutes);

// endpoint to get paypal client ID
app.get('/api/config/paypal', (req, res) => {
	res.send(process.env.PAYPAL_CLIENT_ID);
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
	PORT,
	console.log(
		`server running in ${process.env.NODE_ENV} mode on port ${PORT}`.green
			.underline
	)
);
