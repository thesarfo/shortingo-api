import express from "express";

import { createUrl } from "../controllers/create";
import { getUserURLs } from "../controllers/retrieve";
import { patchUrl } from "../controllers/update";
import { searchUrl } from "../controllers/search";
import { deleteUrl } from "../controllers/delete";

import { verifyToken } from "../middleware/verifyToken";

const router = express.Router();

router.post("/create", verifyToken, createUrl); 
router.get("/get-all/:id", verifyToken, getUserURLs); 
router.get("/search", verifyToken, searchUrl);
router.delete("/delete/:id", verifyToken, deleteUrl); 
router.patch("/update/:id", patchUrl)

export default router;