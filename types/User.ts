import type { Types } from "mongoose";
import Project from "./Project";



interface User {
    _id : Types.ObjectId;
    _v : string,
    clark_id : string;
    updatedAt : Date;
    email : string
    firstname : string
    lastname : string
    imageUrl : string
    projects : Project[]
}


export default User