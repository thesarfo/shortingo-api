import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import urlModel, { IURL } from "../models/url";

export const patchUrl = async (req: Request, res: Response) => {
  const { title, shortLink, ogLink, starred, date }: Partial<IURL> = req.body;
  const urlId = req.params.id;

  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Token missing" });
  }

  try {
    const decoded: any = jwt.verify(token, process.env.SECRET_KEY || "");
    const userId = decoded.userId;

    const url: IURL | null = await urlModel.findById(urlId).exec();

    if (!url) {
      return res.status(404).json({ message: "URL not found" });
    }

    if (url.user.toString() !== userId) {
      console.log(decoded);
      console.log(url.user);
      console.log(userId);
      return res
        .status(403)
        .json({ message: "Unauthorized: Cannot update other user's URLs" });
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
      message: "Failed to patch URL",
      error: error.message,
    });
  }
};
