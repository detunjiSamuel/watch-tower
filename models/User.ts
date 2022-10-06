import mongoose, { Schema } from "mongoose";
import User from '../types/User'


const userSchema = new Schema<User>({
    clark_id: {
        type: String,
        requred: true
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    email: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: false
    },
    lastname: {
        type: String,
        requred: false
    },
    imageUrl: {
        type: String,
        required: false
    },
    projects: [{ type: Schema.Types.ObjectId, ref: "project" }]
})

export default mongoose.model("user", userSchema)