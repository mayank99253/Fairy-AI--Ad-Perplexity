// services/cohere.service.js
import { ChatCohere } from "@langchain/cohere";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { z } from "zod";
import { ENV } from "../config/env.js";

const judgeSchema = z.object({
    geminiScore: z.number().min(0).max(10),
    mistralScore: z.number().min(0).max(10),
    geminiReasoning: z.string(),
    mistralReasoning: z.string(),
    winner: z.enum(["gemini", "mistral", "tie"]),
    verdict: z.string()
});

const cohereModel = new ChatCohere({
    apiKey: ENV.COHERE_API_KEY,
    model: "command-a-03-2025",
    temperature: 0
});

const judgeSystemPrompt = `You are an impartial AI judge. Given a user query and two AI responses (Gemini and Mistral), evaluate each on accuracy, clarity, and helpfulness. Respond ONLY with valid JSON, no markdown, no code fences, no extra text, in this exact format:
{
  "geminiScore": <number 0-10>,
  "mistralScore": <number 0-10>,
  "geminiReasoning": "<1-2 lines>",
  "mistralReasoning": "<1-2 lines>",
  "winner": "gemini" | "mistral" | "tie",
  "verdict": "<1-2 line summary>"
}`;

export const judgeWithCohere = async ({ query, geminiResponse, mistralResponse }) => {
    const userPrompt = `User Query: ${query}\n\nResponse A (Gemini): ${geminiResponse}\n\nResponse B (Mistral): ${mistralResponse}`;

    const response = await cohereModel.invoke([
        new SystemMessage(judgeSystemPrompt),
        new HumanMessage(userPrompt)
    ]);

    const cleaned = response.content.replace(/```json|```/g, "").trim();

    let parsed;
    try {
        parsed = JSON.parse(cleaned);
    } catch (err) {
        throw new Error("Cohere judge returned invalid JSON: " + cleaned.slice(0, 200));
    }

    return judgeSchema.parse(parsed);
};