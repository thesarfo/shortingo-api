import { Request, Response } from 'express';
import jwt from "jsonwebtoken";
import urlModel, { IURL } from "../models/urlModel";



export const createUrl = async (req: Request, res: Response) => {
    const { title, shortLink, ogLink, starred, date }: IURL = req.body;

    const token = req.headers.authorization?.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Token missing' });
    }

    try {
        const decoded: any = jwt.verify(token, process.env.SECRET_KEY || '');

        const userId = decoded.userId;
        const newUrl: IURL = new urlModel({
            title,
            shortLink,
            ogLink,
            starred,
            date,
            user: userId
        });

        const savedUrl: IURL = await newUrl.save();
        res.status(201).json(savedUrl);
    } catch (error: any) {
        res.status(500).json({
            message: 'Failed to create URL',
            error: error.message
        });
    }
};

export const getUserURLs = async (req: Request, res: Response) => {
    const userId = req.params.id;

    try {
        const userURLs: IURL[] = await urlModel.find({ user: userId }).exec();
        res.status(200).json(userURLs);
    } catch (error: any) {
        res.status(500).json({
            message: "Failed to fetch user's URLs",
            error: error.message,
        });
    }
};

export const getUrlById = async (req: Request, res: Response) => {
    const urlId = req.params.id;

    try {
        const url: IURL | null = await urlModel.findById(urlId).exec();
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