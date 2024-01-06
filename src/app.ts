import express from "express";
import cors from "cors";

import urlRoute from "./routes/urlRoutes";
import userRoute from "./routes/userRoutes";

export const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", urlRoute);
app.use("/api/auth", userRoute);

export default app;