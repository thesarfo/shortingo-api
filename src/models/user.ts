import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document{
    username: string,
    email: string,
    password: string,
    createdAt: string,
    updatedAt: string,
}

export const userSchema = new Schema<IUser> ({
    username: { type: String, required: true },
    email: { type: String, required: true},
    password: { type: String, required: true },
    createdAt: { type: String, default: new Date().toLocaleDateString('en-US', {
        year: "numeric",
        month: "long",
        day: "numeric",
    })},
    updatedAt: { type: String, default: new Date().toLocaleDateString('en-US', {
        year: "numeric",
        month: "long",
        day: "numeric",
    })}
})

const userModel: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default userModel;