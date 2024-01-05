import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document{
    name: string,
    email: string,
    password: string
}

export const userSchema = new Schema<IUser> ({
    name: { type: String, required: true },
    email: { type: String, required: true},
    password: { type: String, required: true }
})

const userModel: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default userModel;