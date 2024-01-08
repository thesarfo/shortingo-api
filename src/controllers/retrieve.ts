import { Request, Response } from "express";
import urlModel, { IURL } from "../models/url";

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
