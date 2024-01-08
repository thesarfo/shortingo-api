import { Request, Response } from "express";
import urlModel, { IURL } from "../models/url";

export const searchUrl = async (req: Request, res: Response) => {
  const urlId = req.params.id;
  const { title } = req.query;

  try {
    let query: any = { _id: urlId };

    if (title) {
      query = { title: { $regex: title.toString(), $options: "i" } };
    }

    const url: IURL | null = await urlModel.findOne(query).exec();
    if (!url) {
      return res.status(404).json({ message: "URL not found" });
    }

    res.status(200).json(url);
  } catch (error: any) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
