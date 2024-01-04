import express from "express";

import { createUrl } from "./controllers/urlController";

export const app = express();

app.use(express.json());
app.use("/api", createUrl);
export default app;
