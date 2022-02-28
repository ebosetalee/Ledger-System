//@ts-check
import express from "express";
import validate from "../middleware/validate.js";
import schema from "../validation-schema/index.js";
import { createAccount } from "../controllers/account.js";

const router = express.Router();
const { CREATE } = schema;

router.post("/", validate(CREATE), createAccount);

export default router;
