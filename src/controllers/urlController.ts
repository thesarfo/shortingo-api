import { Request, Response } from 'express';

import urlModel, { IURL } from "../models/urlModel";

export const createUrl = async(req: Request, res: Response) => {
    const { title, date, shortLink, ogLink }: { title: string, date: Date, shortLink: string, ogLink: string } = req.body;

    try {
        const newUrl: IURL = new urlModel({
            title,
            date,
            shortLink,
            ogLink
        });

        const savedUrl: IURL = await newUrl.save();
        res.status(201).json(savedUrl);
    } catch (error: any){
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}