import mongoose from "mongoose";
import { apiError } from "../config/errorHandler.js"
import projectModel from "../models/project.model.js";
import chatModel from "../models/chat.model.js";

export const createProject = async (req, res) => {
    try {
        const userId = req.user._id;
        const { title , description } = req.body;

        if (!title || title.length === '') return apiError(res, 400, 'Title is required');

        const existProject = await projectModel.findOne({ title, user: userId });
        if (existProject) return apiError(res, 403, 'Project Title Should be Unique');

        const project = await projectModel.create({
            user: userId,
            title,
            description
        });

        if (!project) return apiError(res, 400, 'Failed To create Project');
        return res.status(201).json({
            message: "Project Created Successfully",
            project
        })
    } catch (error) {
        console.error(error);
        return apiError(res, 500, 'Internal Server Error');
    }
}

export const addChatInProject = async (req, res) => {
    try {
        const { chatId, projectId } = req.params;
        const userId = req.user._id;

        if (!mongoose.Types.ObjectId.isValid(chatId)) return apiError(res, 400, 'Invalid Id')
        if (!mongoose.Types.ObjectId.isValid(projectId)) return apiError(res, 400, 'Invalid Id')

        const project = await projectModel.findOne({ _id: projectId, user: userId });
        if (!project) return apiError(res, 404, 'Project Not Found');

        const chat = await chatModel.findOneAndUpdate(
            { _id: chatId, user: userId },
            { $set: { projectId } },
            { new: true }
        );
        if (!chat) return apiError(res, 404, 'Chat Not Found');

        return res.status(200).json({
            message: 'Chat Added Successfully',
            chat
        })
    } catch (error) {
        console.error(error);
        return apiError(res, 500, 'Internal Server Error');
    }
}

export const getAllProjectChat = async (req, res) => {
    try {
        const { projectId } = req.params;
        const userId = req.user._id;

        if (!mongoose.Types.ObjectId.isValid(projectId)) return apiError(res, 400, 'Invalid Id');
        
        const project = await projectModel.findOne({ _id: projectId, user: userId });
        if (!project) return apiError(res, 404, 'Project Not Found');

        const chats = await chatModel.find({ projectId, user: userId }).sort({ updatedAt: -1 });

        return res.status(200).json({
            message: 'Fetch Project Chats',
            project,
            chats
        })
    } catch (error) {
        console.error(error);
        return apiError(res, 500, 'Internal Server Error');
    }
}
export const getAllProjects = async (req, res) => {
    try {
        const userId = req.user._id;

        const projects = await projectModel
            .find({ user: userId })

        return res.status(200).json({
            message: 'Fetch All Projects',
            projects
        });

    } catch (error) {
        console.error(error);
        return apiError(res, 500, 'Internal Server Error');
    }
};