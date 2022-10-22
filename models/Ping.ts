import mongoose from "mongoose";

import type IPing from "../types/Ping";


const PingSchemma = new mongoose.Schema<IPing>({
    name: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    ApplicationId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, { strict: false })



export default mongoose.model("ping", PingSchemma)