import mongoose, { Document, Schema, Model, Types } from "mongoose";
import { IUser } from "./user";

export interface IURL extends Document {
  title: string;
  date: string;
  shortLink: string;
  ogLink: string;
  starred: boolean;
  user: Types.ObjectId | IUser;
}

export const urlSchema = new Schema<IURL>({
  title: { type: String, required: true },
  date: { type: String, default: "" },
  shortLink: { type: String },
  ogLink: { type: String },
  starred: { type: Boolean, default: false },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const urlModel: Model<IURL> = mongoose.model<IURL>("URL", urlSchema);

export default urlModel;
