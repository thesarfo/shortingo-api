import mongoose, { Document, Schema, Model } from "mongoose";

export interface IURL extends Document {
    // id: number,
    title: string,
    date: Date,
    shortLink: string,
    ogLink: string,
    starred: boolean
}

export const urlSchema = new Schema<IURL>({
    // id: { type: Number, required: true },
    title: { type: String, required: true },
    date: { type: Date, default: Date.now },
    shortLink: { type: String, },
    ogLink: { type: String, required: true },
    starred: { type: Boolean, required: true, default: false}
});

// urlSchema.pre('save', assignIdMiddleware);

const urlModel: Model<IURL> = mongoose.model<IURL>('URL', urlSchema);

export default urlModel;