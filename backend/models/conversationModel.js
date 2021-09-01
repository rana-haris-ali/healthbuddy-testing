import mongoose from 'mongoose';

const conversationSchema = mongoose.Schema(
	{
		members: {
			type: Array,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model('Conversation', conversationSchema);
