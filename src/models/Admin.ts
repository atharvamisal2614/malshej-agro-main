import mongoose, { model } from "mongoose";

export interface IAdmin {
  name: string;
  email: string;
  password: string;
  verified: boolean;
}

const AdminSchema = new mongoose.Schema<IAdmin>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verified: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

export const Admin =
  mongoose.models.Admin ?? model<IAdmin>("Admin", AdminSchema);
