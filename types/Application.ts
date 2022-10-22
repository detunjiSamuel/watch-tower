import type { Types } from "mongoose"


interface IApplication {
    _id: Types.ObjectId;
    __v: number;
    name: string;
    description: string | null
    updatedAt: Date;
    projectId: Types.ObjectId;
    userId: Types.ObjectId;
}

export default IApplication