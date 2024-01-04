import express from "express";

import urlRoute from "./routes/urlRoutes";

export const app = express();

app.use(express.json());
app.use("/api", urlRoute);


export default app;