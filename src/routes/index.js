import express from "express";
import accountRoutes from "./account.js";
import transactionRoutes from "./transactions.js";

const router = express.Router();

router.use("/account", accountRoutes);

router.use("/transaction", transactionRoutes);

export default router;
