import { generateResponse } from "../services/ai.service.js";


export const sendMessage = async (req, res) => {
    const { message } = req.body;
    const reply = await generateResponse(message);
    res.json({ reply });
};
