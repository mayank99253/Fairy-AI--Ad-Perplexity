import express from 'express'
import { getAllChatsForSearching, getAllImages } from '../controllers/features.controller.js';
import {protectedRoute} from "../middlewares/auth.middleware.js"

export const featureRouter = express.Router();

featureRouter.use(protectedRoute)
featureRouter.get('/fetch-images',getAllImages) 
featureRouter.get('/fetch-chats',getAllChatsForSearching) 