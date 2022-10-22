import mongoose, { Mongoose } from "mongoose"
import type IProject from "../types/Project"

const ProjectSchema = new mongoose.Schema<IProject>({
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
const ProjectModel =  mongoose.models.project || mongoose.model("project", ProjectSchema)


export default ProjectModel 