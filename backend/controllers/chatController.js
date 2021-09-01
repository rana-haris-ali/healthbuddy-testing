import mongoose from 'mongoose';

import asyncHandler from 'express-async-handler';
import Conversation from '../models/conversationModel.js';
import Message from '../models/messageModel.js';
import Doctor from '../models/doctorModel.js';
import User from '../models/userModel.js';

// @desc Get all conversations of a user
//  @route GET /api/chat/conversations
// @access PROTECTED
const getAllConversations = asyncHandler(async (req, res) => {
	// fetch all conversations of a user then find the receiver's details from each conversation and return
	try {
		const allConversations = await Conversation.find({
			members: { $in: [req.user.roleId] },
		});

		let conversationsWithReceiverNames = [];
		for (const conversation of allConversations) {
			let receiverObject = {};
			receiverObject.receiverId = conversation.members.find(
				(member) => String(member) !== String(req.user.roleId)
			);
			receiverObject.receiverDetails = await User.findOne({
				roleId: receiverObject.receiverId,
			}).select('name email role');

			conversationsWithReceiverNames.push(receiverObject);
		}
		res.status(200).json(conversationsWithReceiverNames);
	} catch (error) {
		res.status(500);
		console.log(error);
		throw new Error(error);
	}
});

// @desc Get specific conversation of a user
//  @route GET /api/chat/conversations/:receiverId
// @access PROTECTED
// const getSpecificConversation = asyncHandler(async (req, res) => {
// 	try {
// 		const specificConversation = await Conversation.find({
// 			members: { $eq: [req.user.roleId, req.params.receiverId] },
// 		});
// 		res.status(200).json(specificConversation);
// 	} catch (error) {
// 		res.status(500);
// 		console.log(error);
// 		throw new Error(error);
// 	}
// });

// @desc Create and save a new conversation
//  @route POST /api/chat/conversations/:receiverId
// @access PROTECTED
const postConversation = asyncHandler(async (req, res) => {
	const newConversation = new Conversation({
		members: [req.user.roleId, mongoose.Types.ObjectId(req.params.receiverId)],
	});

	try {
		const savedConversation = await newConversation.save();
		res.status(200).json(savedConversation);
	} catch (error) {
		res.status(500);
		console.log(error);
		throw new Error(error);
	}
});

// @desc Get all messages of a conversation
//  @route GET /api/chat/messages/:conversationId
// @access PROTECTED
const getAllMessages = asyncHandler(async (req, res) => {
	try {
		const allMessages = await Message.find({
			conversationId: req.params.conversationId,
		});
		res.status(200).json(allMessages);
	} catch (error) {
		res.status(500);
		console.log(error);
		throw new Error(error);
	}
});

// @desc Create and save a new message i.e. Send a message
//  @route POST /api/chat/messages/:conversationId
// @access PROTECTED
const postMessage = asyncHandler(async (req, res) => {
	const newMessage = new Message({
		sender: req.user.roleId,
		conversationId: req.params.conversationId,
		text: req.body.text,
	});

	try {
		const savedMessage = await newMessage.save();
		res.status(200).json(savedMessage);
	} catch (error) {
		res.status(500);
		console.log(error);
		throw new Error(error);
	}
});

export {
	getAllConversations,
	// getSpecificConversation,
	postConversation,
	getAllMessages,
	postMessage,
};
