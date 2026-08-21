import express from 'express'
import { addChatInProject, createProject, getAllProjectChat, getAllProjects } from '../controllers/project.controller.js';
import {protectedRoute} from "../middlewares/auth.middleware.js"

export const projectRouter = express.Router();
projectRouter.use(protectedRoute)

projectRouter.post('/create-project', createProject);
projectRouter.post('/add/:projectId/:chatId', addChatInProject);
projectRouter.get('/:projectId/chats', getAllProjectChat);
projectRouter.get('/projects', getAllProjects);
