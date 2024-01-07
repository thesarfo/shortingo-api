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

export const searchUrl = async (req: Request, res: Response) => {
    const urlId = req.params.id;
    const { title } = req.query;

    try {
        let query: any = { _id: urlId }; 

        if (title) {
            query = { title: { $regex: title.toString(), $options: 'i' } }; 
        }

        const url: IURL | null = await urlModel.findOne(query).exec();
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

export const patchUrl = async (req: Request, res: Response) => {
    const { title, shortLink, ogLink, starred, date }: Partial<IURL> = req.body;
    const urlId = req.params.id;
  
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: Token missing' });
    }
  
    try {
      const decoded: any = jwt.verify(token, process.env.SECRET_KEY || '');
      const userId = decoded.userId;
  
      const url: IURL | null = await urlModel.findById(urlId).exec();
  
      if (!url) {
        return res.status(404).json({ message: 'URL not found' });
      }
  
      if (url.user.toString() !== userId) {
        console.log(decoded);
        console.log(url.user);
        console.log(userId);
        return res.status(403).json({ message: 'Unauthorized: Cannot update other user\'s URLs' });
      }
    //   const updatedUrl = { ...url, ...req.body };
    //   updatedUrl.user = userId;

    if (title) {
        url.title = title;
      }
      if (shortLink) {
        url.shortLink = shortLink;
      }
      if (ogLink) {
        url.ogLink = ogLink;
      }
      if (starred !== undefined) {
        url.starred = starred;
      }
      if (date) {
        url.date = date;
      }
  
      url.user = userId;
  
      const savedUrl: IURL = await url.save();
      res.status(200).json(savedUrl);
    } catch (error: any) {
      res.status(500).json({
        message: 'Failed to patch URL',
        error: error.message,
      });
    }
  };