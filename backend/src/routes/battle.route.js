import express from 'express'
import { getBattleMessages, sendMessageForBattle } from '../controllers/battle.controller.js';
import {protectedRoute} from '../middlewares/auth.middleware.js'

export const battleRouter = express.Router();

battleRouter.use(protectedRoute)

battleRouter.post('/ai/arena', sendMessageForBattle);
battleRouter.get('/ai/:chatId', getBattleMessages);