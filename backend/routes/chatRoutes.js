import express from 'express';

import { protect } from '../middleware/authMiddleware.js';
import {
	getAllConversationsWithMessages,
	// getSpecificConversation,
	postConversation,
	getAllMessages,
	postMessage,
} from '../controllers/chatController.js';

// /api/chat
const router = express.Router();

router.route('/conversations').get(protect, getAllConversationsWithMessages);

router
	.route('/conversations/:receiverId')
	// .get(protect, getSpecificConversation)
	.post(protect, postConversation);

router
	.route('/messages/:conversationId')
	.get(protect, getAllMessages)
	.post(protect, postMessage);

export default router;
