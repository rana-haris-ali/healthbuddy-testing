import mongoose from 'mongoose';

const doctorSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		degrees: {
			type: Array,
			required: true,
		},
		isApproved: {
			type: Boolean,
			required: true,
			default: false,
		},
		address: {
			type: String,
			required: false,
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

export default mongoose.model('Doctor', doctorSchema);
