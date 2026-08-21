import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    title: {
        type: String,
        default: "New Chat",
        required: true
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'project',
        default: null
    }
}, {
    timestamps: true
});

const chatModel = mongoose.model("chat", chatSchema)

export default chatModel;
