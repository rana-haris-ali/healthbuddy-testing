import mongoose from 'mongoose';

const requestSchema = mongoose.Schema(
	{
		patient: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Patient',
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		doctor: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Doctor',
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model('Request', requestSchema);
