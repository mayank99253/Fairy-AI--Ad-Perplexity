// creating Server

import express from 'express'
import cookieParser from 'cookie-parser'
import { authRouter } from './routes/auth.route.js';
import { agentRouter } from './routes/message.route.js';

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/ai", agentRouter)