import { Request, Response } from 'express';
import urlModel, { IURL } from "../models/urlModel";

export const createUrl = async (req: Request, res: Response) => {
    const { title, date, shortLink, ogLink, starred }:IURL = req.body;

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
            message: "Failed to create URL",
            error: error.message
        });
    }
};

export const getAllUrls = async (req: Request, res: Response) => {
    try {
        const allUrls: IURL[] = await urlModel.find({}).exec();
        res.status(200).json(allUrls);
    } catch (error: any) {
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};


export const getUrl = async (req: Request, res: Response) => {
    const urlId = req.params.id;

    try {
        const url = await urlModel.findById(urlId);
        if (!url) {
            return res.status(404).json({ message: 'URL not found' });
        }
        res.status(200).json(url);
    } catch (error: any) {
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};

export const updateUrl = async (req: Request, res: Response) => {
    const urlId = req.params.id;
    const { title, date, shortLink, ogLink, starred }: IURL = req.body;

    try {
        const url: IURL | null = await urlModel.findById(urlId).exec();
        if (!url) {
            return res.status(404).json({ message: 'URL not found' });
        }

        url.title = title;
        url.date = date;
        url.shortLink = shortLink;
        url.ogLink = ogLink;
        url.starred = starred;

        const updatedUrl: IURL = await url.save();
        res.status(200).json(updatedUrl);
    } catch (error: any) {
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};

export const deleteUrl = async (req: Request, res: Response) => {
    const urlId: string = req.params.id;

    try {
        console.log(`Deleting url with ID: ${urlId}`)
        const deletedUrl = await urlModel.findByIdAndDelete(urlId).exec();
        if (!deletedUrl) {
            return res.status(404).json({ message: 'URL not found' });
        }
        res.status(200).json({ message: 'URL deleted successfully' });
    } catch (error: any) {
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};