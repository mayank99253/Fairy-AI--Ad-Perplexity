import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import morgan from 'morgan'
import { authRouter } from "./routes/auth.route.js";
import { chatRouter } from "./routes/chat.route.js";
import { featureRouter } from "./routes/feature.route.js";
import { projectRouter } from "./routes/project.route.js";
import { battleRouter } from "./routes/battle.route.js";

export const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(morgan('dev'));

app.use(cors({
    origin:['http://localhost:5173'],
    credentials: true,
    methods : ['GET','POST','PATCH','DELETE','PUT'],
    allowedHeaders :['Content-Type','Authorization'],
}));

app.use('/api/auth/v1' , authRouter);
app.use("/api/ai/v1" , chatRouter);
app.use('/api/feature/v1', featureRouter)
app.use('/api/project/v1', projectRouter)
app.use('/api/battle/v1', battleRouter)