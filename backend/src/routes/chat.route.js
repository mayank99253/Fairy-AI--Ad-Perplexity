import express from "express"
import { deleteChat, getChat, getMessage, sendMessage } from "../controllers/message.controller.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";

export const chatRouter = express.Router();

chatRouter.post("/chat" , protectedRoute,  sendMessage)
chatRouter.get("/" , protectedRoute,  getChat)
chatRouter.get("/:chatId/messages" , protectedRoute,  getMessage)
chatRouter.delete("/:chatId" , protectedRoute,  deleteChat)

