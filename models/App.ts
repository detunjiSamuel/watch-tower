import mongoose from "mongoose"
import type IApplication from "../types/Application"

const AppSchema = new mongoose.Schema<IApplication>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "project",
        required: true,
      },
})

const AppModel = mongoose.models.app || mongoose.model("app", AppSchema)



export default AppModel 