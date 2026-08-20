import { apiError } from "../config/errorHandler.js";
import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";

export const getAllImages = async (req, res) => {
    try {
        const userId = req.user._id;

        const chats = await chatModel.find({
            user: userId
        });

        const chatIds = await chats.map(chat => chat._id);

        const imageUrl = await messageModel.find({
            chat: { $in: chatIds },
            imageUrl: { $exists: true, $ne: null , $nin : ["" , null]}
        });

        const images = imageUrl.map((img) => ({
            _id: img._id,
            imageUrl: img.imageUrl,
            createdAt: img.createdAt,
        }))

        return res.status(200).json({
            message: "Images Fetch Successfully",
            imagesUrl: images
        });
    } catch (error) {
        console.error(error);
        return apiError(res, 500, 'Internal Server Error');
    }
}

export const getAllChatsForSearching =async (req, res) => {
    try {
        const userId  = req.user._id;
        const allChats = await chatModel.find({
            user : userId
        });

        return res.status(200).json({
            message  :"Chats Fetch Successfully",
            allChats : allChats.length !== 0 ? allChats : []
        })
    } catch (error) {
        console.error(error)
        return apiError(res, 500 , 'Internal Server Error');
    }
}