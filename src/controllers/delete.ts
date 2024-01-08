import { Request, Response } from "express";
import urlModel, { IURL } from "../models/url";

export const deleteUrl = async (req: Request, res: Response) => {
  const urlId: string = req.params.id;

  try {
    console.log(`Deleting url with ID: ${urlId}`);
    const deletedUrl = await urlModel.findByIdAndDelete(urlId).exec();
    if (!deletedUrl) {
      return res.status(404).json({ message: "URL not found" });
    }
    res.status(200).json({ message: "URL deleted successfully" });
  } catch (error: any) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
