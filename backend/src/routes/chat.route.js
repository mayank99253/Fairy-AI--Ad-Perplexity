import express from "express"
import { deleteChat, getChat, getChatMode, getMessage, sendMessage } from "../controllers/message.controller.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";

export const chatRouter = express.Router();
chatRouter.use(protectedRoute)

chatRouter.post("/send-message", sendMessage)
chatRouter.get("/:chatId/messages", getMessage)
chatRouter.get("/get-chats", getChat)
chatRouter.delete("/:chatId", deleteChat)

chatRouter.get('/:chatId/mode', getChatMode);

