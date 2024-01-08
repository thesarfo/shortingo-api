import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import urlModel, { IURL } from "../models/url";

export const createUrl = async (req: Request, res: Response) => {
  const { title, shortLink, ogLink, starred, date }: IURL = req.body;

  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Token missing" });
  }

  try {
    const decoded: any = jwt.verify(token, process.env.SECRET_KEY || "");

    const userId = decoded.userId;
    const newUrl: IURL = new urlModel({
      title,
      shortLink,
      ogLink,
      starred,
      date,
      user: userId,
    });

    const savedUrl: IURL = await newUrl.save();
    res.status(201).json(savedUrl);
  } catch (error: any) {
    res.status(500).json({
      message: "Failed to create URL",
      error: error.message,
    });
  }
};
