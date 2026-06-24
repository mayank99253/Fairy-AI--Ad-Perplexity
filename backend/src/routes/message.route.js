import express from "express"
import { sendMessage } from "../controllers/message.controller.js";

export const agentRouter = express.Router();


agentRouter.post('/chat/message', sendMessage);
