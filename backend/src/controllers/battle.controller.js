import { generateGeminiResponse } from "../services/gemini.service.js";
import { generateMistralResponse } from "../services/mistral.service.js";
import { judgeWithCohere } from "../services/cohere.service.js";
import {apiError} from "../config/errorHandler.js";
import messageModel, { battleMessage } from "../models/message.model.js";
import chatModel from "../models/chat.model.js";;
import { generateChatTitle } from "../services/ai.service.js";

export const sendMessageForBattle = async (req, res) => {
    try {
        const { message, chat: chatId } = req.body;
        const userId = req.user._id;

        if (!message) {
            return apiError(res, 400, "message is required");
        }

        let title = null, chat = null;

        if (!chatId) {
            title = await generateChatTitle(message);
            chat = await chatModel.create({
                user: userId,
                title: title,
                mode : 'battle'
            });
        }

        const chatExists = chatId
            ? await chatModel.findOne({ _id: chatId, user: userId })
            : null;

        if (!chatExists && chatId) {
            return apiError(res, 404, "Chat Not Found");
        }

        const finalChatId = chatId || chat._id;

        // Step 1: save user message
        const userMessage = await messageModel.create({
            chat: finalChatId,
            content: message,
            role: "user"
        });

        // Step 2: both models invoked at the same time
        const [geminiResponse, mistralResponse] = await Promise.all([
            generateGeminiResponse(message),
            generateMistralResponse(message)
        ]);

        // Step 3: cohere judges both responses
        const judgeResult = await judgeWithCohere({
            query: message,
            geminiResponse,
            mistralResponse
        });

        // Step 4: save battle message
        const savedBattleMessage = await battleMessage.create({
            chat: finalChatId,
            content: message,
            role: "battle",
            geminiResponse,
            mistralResponse,
            judgeResult
        });

        // Step 5: return response
        return res.status(201).json({
            message: "Battle Judged Successfully",
            title: title || chatExists.title,
            chat: finalChatId,
            geminiResponse,
            mistralResponse,
            judgeResult,
            battleMessageId: savedBattleMessage._id
        });

    } catch (error) {
        console.error(error);
        return apiError(res, 500, "Internal Server Error");
    }
};
export const getBattleMessages = async (req, res) => {
    try {
        const { chatId } = req.params;

        if (!chatId) {
            return apiError(res, 400, "chatId is required");
        }

        const messages = await battleMessage.find({ chat: chatId }).sort({ createdAt: 1 });

        return res.status(200).json({
            success: true,
            chatId,
            messages
        });

    } catch (error) {
        return apiError(res, 500, error.message || "Something went wrong while fetching battle messages");
    }
};