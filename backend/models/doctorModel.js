import mongoose from 'mongoose';
import { reviewSchema } from './reviewModel.js';

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
		description: {
			type: String,
			required: true,
			maxLength: 100,
		},
		specializations: {
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
		reviews: [reviewSchema],
		rating: {
			type: Number,
			required: true,
			default: 0,
		},
		numReviews: {
			type: Number,
			required: true,
			default: 0,
		},
		isVerified: {
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
