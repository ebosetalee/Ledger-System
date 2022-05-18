//@ts-check
import "dotenv/config";
import express from "express";
import ErrorHandler from "./middleware/error-handler.js";

// controllers
import v1Routes from "./routes/index.js";

const app = express();

process.on("uncaughtException", err => {
    console.error("UNCAUGHT EXCEPTION! 💥 Shutting down...");
    console.error(err);
    process.exit(1);
});

app.use(express.json());

app.use("/api/v1", v1Routes);

app.use(ErrorHandler);

export default app;
