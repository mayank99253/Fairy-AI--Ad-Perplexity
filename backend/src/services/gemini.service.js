// services/gemini.service.js
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage } from "@langchain/core/messages";
import { ENV } from "../config/env.js";

const geminiModel = new ChatGoogleGenerativeAI({
    apiKey: ENV.GOOGLE_API_KEY,
    model: "gemini-3.5-flash-lite",
    temperature: 0.7
});

export const generateGeminiResponse = async (query) => {
    const response = await geminiModel.invoke([new HumanMessage(query)]);
    return response.content;
};