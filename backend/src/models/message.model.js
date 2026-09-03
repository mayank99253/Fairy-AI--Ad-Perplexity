import mongoose, { Schema } from "mongoose";

const messageSchema = new mongoose.Schema({
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "chat",
        required: true
    },
    content: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        default: ''
    },
    role: {
        type: String,
        enum: ["user", "ai", "battle"],
        required: true
    }
}, { timestamps: true });

const messageModel = mongoose.model("message", messageSchema);

const battleMessage = messageModel.discriminator('battle', new Schema({
    geminiResponse: {
        type: String,
        required: true
    },
    mistralResponse: {
        type: String,
        required: true
    },
    judgeResult: {
        geminiScore: { type: Number, min: 0, max: 10 },
        mistralScore: { type: Number, min: 0, max: 10 },
        geminiReasoning: { type: String },
        mistralReasoning: { type: String },
        winner: { type: String, enum: ["gemini", "mistral", "tie"] },
        verdict: { type: String }
    }
}));

export default messageModel;
export { battleMessage };