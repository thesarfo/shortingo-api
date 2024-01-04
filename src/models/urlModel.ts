import mongoose, { Document, Schema, Model } from "mongoose";

export interface IURL extends Document {
    title: string,
    date: Date,
    shortLink: string,
    ogLink: string,
}

export const urlSchema = new Schema<IURL>({
    title: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now },
    shortLink: { type: String, required: true },
    ogLink: { type: String, required: true },
});

const urlModel: Model<IURL> = mongoose.model<IURL>('URL', urlSchema);

export default urlModel;