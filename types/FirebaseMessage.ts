import type { Types } from "mongoose"



interface IFirebaseCloudMessage {
    _id :  Types.ObjectId;
    __v : number;
    token : string;
    userId  : Types.ObjectId
}

export default IFirebaseCloudMessage