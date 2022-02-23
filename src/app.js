import "dotenv/config";
import express from "express";

export const app = express();
export const port = process.env.PORT || 4041;

app.use(express.json());
