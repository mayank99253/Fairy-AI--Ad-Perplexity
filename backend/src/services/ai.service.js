import { ChatMistralAI } from "@langchain/mistralai";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai"
import { ENV } from "../config/env.js";
import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";

const mistralModel = new ChatMistralAI({
  model: "mistral-small-latest",
  temtemperature: 0
});

const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: ENV.GOOGLE_API_KEY
})




export const generateChatTitle = async (message) => {
  try {
    const result = await mistralModel.invoke([new SystemMessage(`you are a helpful assistant that generate concise and descriptive titles for the chat conversation
      User will provide you with the first message of the chat conversation , and you will generate a title That captures the essence of the conversation in 2-4 words. The title should be clear , relevant and engaging , giving users a quick understanding of the chat's topic`) , new HumanMessage(` Generate a title For a chat conversation based on the following first message : ${message}`)])

      return result.content
  } catch (error) {
    console.error("Error generating embeddings:", error);
    throw error;
  }
}

export const generateAIResponse = async (messages) => {
  try {
    const result = await geminiModel.invoke(messages.map(msg => {
      if(msg.role === "user" ){
        return new HumanMessage(msg.content)
      }else if(msg.role === "ai"){
        return new AIMessage(msg.content)
      }
    }));
    return result.content;
  } catch (error) {
    console.error("Error generating embeddings:", error);
    throw error;
  }
};
