import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ENV } from "../config/env.js"
import * as readline from "readline"
import { HumanMessage } from "@langchain/core/messages";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: ENV.GOOGLE_API_KEY
});

export async function generateResponse(message) {
  const response = await model.invoke(new HumanMessage(message));
  return response.content;
} 