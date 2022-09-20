import mongoose from "mongoose"


const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
})

const ProjectModel = mongoose.model("project", ProjectSchema)



export default ProjectModel 