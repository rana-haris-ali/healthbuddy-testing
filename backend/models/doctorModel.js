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
	},
	{
		timestamps: true,
	}
);

export default mongoose.model('Doctor', doctorSchema);
