import http from "http";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

import app from "./app";

const PORT = process.env.PORT || 5000;
const MONGO_URL: string = process.env.MONGO_URL!;

const server: http.Server = http.createServer(app);

mongoose.connection.once('open', ()=>{
    console.log("MongoDB connection is ready")
});
mongoose.connection.on("error", (err: Error) => {
    console.error(err);
});

async function startServer(): Promise<void> {
    try{
        await mongoose.connect(MONGO_URL);
        server.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`)
        })
    } catch(error: any){
        console.error("Error starting the server:", error)
    }
}

startServer();