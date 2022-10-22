import mongoose from "mongoose";
import type IFirebaseCloudMessage from "../types/FirebaseMessage";

const FCMSchema =  new mongoose.Schema<IFirebaseCloudMessage>({
    token : {
        type : String,
        required : true,
        unique : true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        required :  true
    }
})


export default mongoose.model("fcm" , FCMSchema)