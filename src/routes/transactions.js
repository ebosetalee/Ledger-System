//@ts-check
import express from "express";
import validate from "../middleware/validate.js";
import schema from "../validation-schema/index.js";
import { makeDeposit } from "../controllers/transactions.js";

const router = express.Router();
const { DEPOSIT } = schema;

router.post("/deposit", validate(DEPOSIT), makeDeposit);

export default router;
