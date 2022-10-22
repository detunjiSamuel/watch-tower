import type { Types } from "mongoose";

interface IProject {
  _id: Types.ObjectId;
  __v: number;
  name: string;
  description: string | null;
  createdAt: Date;
  userId: Types.ObjectId;
}

export default IProject;
