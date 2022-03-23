//@ts-check
import express from "express";
import validate from "../middleware/validate.js";
import schema from "../validation-schema/index.js";
import { createAccount, getAccount, updateAccount, updateAccountWithId } from "../controllers/account.js";
import { disableAccount } from "../controllers/account.js";

const router = express.Router();
const { CREATE, UPDATE } = schema;

router.post("/", validate(CREATE), createAccount);

router.get("/:id", getAccount);

router.patch("/", validate(UPDATE), updateAccount);

router.patch("/:id", updateAccountWithId);

router.post("/:id", disableAccount);

export default router;
