// services/mistral.service.js
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage } from "@langchain/core/messages";
import { ENV } from "../config/env.js";

const mistralModel = new ChatMistralAI({
    apiKey: ENV.MISTRAL_API_KEY,
    model: "mistral-small-latest",
    temperature: 0.7
});

export const generateMistralResponse = async (query) => {
    const response = await mistralModel.invoke([new HumanMessage(query)]);
    return response.content;
};