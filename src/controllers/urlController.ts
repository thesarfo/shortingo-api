import { Request, Response } from 'express';
import urlModel, { IURL } from "../models/urlModel";

export const createUrl = async (req: Request, res: Response) => {
    const { title, date, shortLink, ogLink, starred }: { title: string, date: Date, shortLink: string, ogLink: string, starred: boolean } = req.body;

    try {
        const newUrl: IURL = new urlModel({
            title,
            date,
            shortLink,
            ogLink,
            starred
        });

        const savedUrl: IURL = await newUrl.save();
        res.status(201).json(savedUrl);
    } catch (error: any) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};