import express from "express";

import {
    createUrl
} from "../controllers/urlController";
import { create } from "ts-node";

const router = express.Router();

router.post("/create", createUrl);

export default router;