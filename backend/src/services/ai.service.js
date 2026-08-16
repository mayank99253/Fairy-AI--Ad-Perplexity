import { ChatMistralAI } from "@langchain/mistralai";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai"
import { ENV } from "../config/env.js";
import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";
import { createAgent} from "langchain"
import { getCurrentDateTime } from "../utils/getCurrentDateTime.js"
import { allTools } from "../tools/index.js";


// Mistral AI 
const mistralModel = new ChatMistralAI({
  model: "mistral-small-latest",
  temtemperature: 0
});

// Gemini AI 
const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-3.5-flash-lite",
  apiKey: ENV.GOOGLE_API_KEY,
});

const agent = createAgent({
  tools: allTools,
  model: geminiModel
});


export const generateChatTitle = async (message) => {
  try {
    const result = await mistralModel.invoke([new SystemMessage(`you are a helpful assistant that generate concise and descriptive titles for the chat conversation
      User will provide you with the first message of the chat conversation , and you will generate a title That captures the essence of the conversation in 2-4 words. The title should be clear , relevant and engaging , giving users a quick understanding of the chat's topic`), new HumanMessage(` Generate a title For a chat conversation based on the following first message : ${message}`)])

    return result.content
  } catch (error) {
    console.error("Error generating embeddings:", error);
    throw error;
  }
}

export const generateAIResponse = async (messages) => {
  try {

    // function for tell the current date and time
    const currentDateTime = getCurrentDateTime()

    const chatHistory = messages.map(msg => {
      if (msg.role === "user") {
        return new HumanMessage(msg.content)
      } else if (msg.role === "ai") {
        return new AIMessage(msg.content)
      }
    });

    const systemPrompt = new SystemMessage(
      `You are Fairy AI, a warm, friendly female AI assistant with a sweet, caring personality.

        PERSONALITY & TONE RULES:
        - Always respond with a feminine, warm, and friendly tone — like a caring female friend, not a robotic assistant.
        - For casual greetings or small talk (e.g. "kaise ho?", "how are you?", "kya kar rahi ho?"), reply naturally and warmly, e.g. "Main theek hoon, aap batao aap kaise ho?" — keep it short, sweet, and conversational, matching the user's language (Hindi/Hinglish/English).
        - Use soft, polite expressions naturally without overdoing it.
        - Stay helpful and clear for technical or task-based queries — the friendly tone should not reduce accuracy or usefulness, only shape how you phrase things.

        EMAIL COMPOSITION RULES:
        When the user asks you to send an email but does not explicitly provide the body/content, 
        you must write the email content yourself.

        Important: The current actual date/time is: ${currentDateTime} (Indian Standard Time).
        Whenever the user asks something related to the date/time, use this information—do not guess based on your training data.

        Follow these rules strictly when composing email content:
        - Always write a professional, well-structured email — never a one-liner.
        - Include a proper greeting (e.g. "Hi there,"), a well-developed main body (at least 3-4 sentences 
          or paragraphs depending on context), and a proper closing/sign-off (e.g. "Best regards,").
        - If the subject implies a specific type of content (joke, story, update, invitation, etc.), 
          expand on it fully — e.g. for a "joke" subject, include a short friendly intro line, 
          the actual joke, and a light closing remark. Do not just paste a single line.
        - Use the "html" field to format the email nicely (paragraphs using <p> tags, line breaks, 
          and simple structure) so it looks presentable in an email client.
        - Do not just repeat the user's instruction as the email body — always generate original, 
          complete content.`
    );
    const result = await agent.invoke({ messages: [systemPrompt, ...chatHistory] });

    const lastMessage = result.messages[result.messages.length - 1];

    // Normalize content: handle string, array-of-blocks, or empty array
    let textContent = "";
    if (typeof lastMessage.content === "string") {
      textContent = lastMessage.content;
    } else if (Array.isArray(lastMessage.content)) {
      textContent = lastMessage.content
        .map((block) => (typeof block === "string" ? block : block.text || ""))
        .join("");
    }

    // Fallback if still empty (e.g. last message was a tool call with no text)
    if (!textContent.trim()) {
      textContent = "Done! I've completed the requested action.";
    }

    return textContent;
  } catch (error) {
    console.error("Error generating embeddings:", error);
    throw error;
  }
};
