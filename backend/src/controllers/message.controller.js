import mongoose from "mongoose";
import { apiError } from "../config/errorHandler.js"
import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";
import { generateAIResponse, generateChatTitle } from "../services/ai.service.js";

export const sendMessage = async (req, res) => {
    try {
        const { message, chat: chatId } = req.body;
        const userId = req.user._id;

        let title = null, chat = null
        if (!chatId) {
            title = await generateChatTitle(message)
            chat = await chatModel.create({
                user: userId,
                title: title
            });
        };

        const chatExists = await chatModel.findOne({
            _id: chatId,
            user: userId
        });

        if (!chatExists && chatId) {
            return apiError(res, 404, "Chat Not Found");
        }

        const userMessage = await messageModel.create({
            chat: chatId || chat._id,
            content: message,
            role: "user"
        });

        const messages = await messageModel.find({ chat: chatId || chat._id });

        const aiResponse = await generateAIResponse(messages);

        const aiMessage = await messageModel.create({
            chat: chatId || chat._id,
            content: aiResponse.text,
            imageUrl: aiResponse.imageUrl,
            role: "ai"
        });


        return res.status(200).json({
            message: "AI Sent the Response",
            title: title || chatExists.title,
            chat: chatId || chat._id,
            aiMessage
        });

    } catch (error) {
        console.error(error)
        return apiError(res, 500, "Internal Server Error");
    }
}

export const getChat = async (req, res) => {
    try {
        const userId = req.user._id;

        const chat = await chatModel.find({ user: userId });

        return res.status(200).json({ message: "Fetch all chats successfully", chat });
    } catch (error) {
        console.error(error)
        return apiError(res, 500, "Internal Server Error")
    }
}
export const getMessage = async (req, res) => {
    try {
        const { chatId } = req.params;
        const userId = req.user._id;
        if (!mongoose.Types.ObjectId.isValid(chatId)) return apiError(res, 400, 'Invalid Chat ID')
        const chat = await chatModel.findOne({
            _id: chatId,
            user: userId
        })

        if (!chat) return apiError(res, 404, "Chat Not Found")

        const messages = await messageModel.find({ chat: chat._id });

        return res.status(200).json({ message: "Messages fetch successfully", messages , chat })
    } catch (error) {
        console.error(error)
        return apiError(res, 500, "Internal Server Error")
    }
}

export const deleteChat = async (req, res) => {
    try {
        const { chatId } = req.params;
        const userId = req.user.id;

        if (!mongoose.Types.ObjectId.isValid(chatId)) return apiError(res, 400, "Invalid Chat ID");

        const chat = await chatModel.findOneAndDelete({
            _id: chatId,
            user: userId
        });

        if (!chat) return apiError(res, 404, "Chat Not Found")

        const messages = await messageModel.deleteMany({
            chat: chat._id
        });

        return res.status(200).json({ message: "Messages delete successfully" })

    } catch (error) {
        console.error(error);
        return apiError(res, 500, "Internal Server Error")
    }
}