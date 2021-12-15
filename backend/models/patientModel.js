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
		medicalInfo: {
			type: String,
		},
		acceptedDoctors: {
			type: Array,
		},
		coordinates: {
			latitude: {
				type: Number,
				required: false,
			},
			longitude: {
				type: Number,
				required: false,
			},
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model('Patient', patientSchema);
