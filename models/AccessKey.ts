import mongoose from "mongoose";

import type IAccessKey from "../types/AccessKey";

const AccessKeySchema = new mongoose.Schema<IAccessKey>({
    key: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})


export default mongoose.models.accesskey || mongoose.model("accesskey", AccessKeySchema)