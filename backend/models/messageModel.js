import mongoose from 'mongoose';

const messageSchema = mongoose.Schema(
	{
		conversationId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Conversation',
		},
		sender: {
			type: mongoose.Schema.Types.ObjectId,
		},
		text: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model('Message', messageSchema);
