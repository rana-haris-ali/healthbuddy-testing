import mongoose from 'mongoose';

const patientSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		diseases: {
			type: Array,
			required: true,
		},
		acceptedDoctors: {
			type: Array,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model('Patient', patientSchema);
