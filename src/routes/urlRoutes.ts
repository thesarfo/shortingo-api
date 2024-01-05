import express from "express";

import {
    createUrl, deleteUrl, getAllUrls, getUrl, updateUrl
} from "../controllers/urlController";
import { verifyToken } from "../middleware/verifyToken";

const router = express.Router();

router.post("/create", verifyToken, createUrl); 
router.get("/getAll", verifyToken, getAllUrls); 
router.get("/getOne/:id", verifyToken, getUrl); 
router.put("/update/:id", verifyToken, updateUrl);
router.delete("/delete/:id", verifyToken, deleteUrl); 
export default router;