import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document{
    username: string,
    email: string,
    password: string,
    createdAt: Date,
    updatedAt: Date,
}

export const userSchema = new Schema<IUser> ({
    username: { type: String, required: true },
    email: { type: String, required: true},
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

const userModel: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default userModel;