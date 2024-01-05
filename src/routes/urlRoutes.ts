import express from "express";

import {
    createUrl, deleteUrl, getUrlById, /*getAllUrls*/ getUserURLs, updateUrl
} from "../controllers/urlController";
import { verifyToken } from "../middleware/verifyToken";

const router = express.Router();

router.post("/create", verifyToken, createUrl); 
router.get("/getAll/:id", verifyToken, getUserURLs); 
router.get("/getOne/:id", verifyToken, getUrlById);
router.put("/update/:id", verifyToken, updateUrl);
router.delete("/delete/:id", verifyToken, deleteUrl); 

export default router;