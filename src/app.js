//@ts-check
import "dotenv/config";
import express from "express";
import errorHandler from "./middleware/error-handler.js";

// controllers
import accountRoutes from "./routes/account.js";

const app = express();

process.on("uncaughtException", err => {
    console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
    console.log(err);
    process.exit(1);
});

app.use(express.json());

app.use("/api/v1/account", accountRoutes);

app.use(errorHandler);

console.log(Date());
console.log(new Date())

export default app;
