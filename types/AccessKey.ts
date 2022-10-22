import type { Types } from "mongoose"


interface IAccessKey {
    _id: Types.ObjectId;
    __v: number;
    key: string;
    userId: Types.ObjectId
}

export default IAccessKey 