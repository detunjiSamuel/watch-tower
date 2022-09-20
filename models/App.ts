import mongoose from "mongoose"


const AppSchema = new mongoose.Schema({
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

const AppModel = mongoose.model("app", AppSchema)



export default AppModel 