//@ts-check
import Account from "../models/accounts.js";
import { checkAccountExists } from "../utils/helpers.js";
import { StatusCodes } from "http-status-codes";
import ErrorResponse from "../utils/errors/index.js";
import asyncHandler from "../middleware/async.js";

const { CONFLICT, CREATED, BAD_REQUEST, OK } = StatusCodes;

export const createAccount = asyncHandler(async (req, res) => {
    console.log("Creating new account");
    
    const data = req.body;

    const accountAvailable = await checkAccountExists(data.account_number, "account_number");

    if (accountAvailable) {
        throw new ErrorResponse("Account already exists", CONFLICT);
    }

    let account = new Account(data);

    account = await account.save();

    if (!account) {
        throw  new ErrorResponse("Account couldn't be created", BAD_REQUEST);
    }

    res.status(CREATED).json({ message: "Account created successfully", account });
});
