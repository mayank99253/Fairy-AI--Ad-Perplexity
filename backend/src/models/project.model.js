import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    description: {
        type: String,
        default: ""
    },
}, {
    timestamps: true
})

const projectModel = mongoose.model('project', projectSchema);

export default projectModel;