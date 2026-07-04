import express from "express"
import cookieParser from "cookie-parser"
import { authRouter } from "./routes/auth.route.js";
import { chatRouter } from "./routes/chat.route.js";

export const app = express();

app.use(express.json());
app.use(cookieParser())

app.use('/api/auth/v1' , authRouter);
app.use("/api/ai/v1" , chatRouter);