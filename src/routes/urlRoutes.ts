import express from "express";

import {
    createUrl, deleteUrl, searchUrl, getUserURLs, patchUrl
} from "../controllers/urlController";
import { verifyToken } from "../middleware/verifyToken";

const router = express.Router();

router.post("/create", verifyToken, createUrl); 
router.get("/get-all/:id", verifyToken, getUserURLs); 
router.get("/search", verifyToken, searchUrl);
router.delete("/delete/:id", verifyToken, deleteUrl); 
router.patch("/update/:id", patchUrl)

export default router;