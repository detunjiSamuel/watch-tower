import type { Types } from "mongoose"


interface IPing {
    _id: Types.ObjectId;
    __v: number;
    ApplicationId: Types.ObjectId
    name?: string;
    description?: string;
    [Key: string]: any;
}

export default IPing