//@ts-check
import Account from "../models/accounts.js";
import { checkAccountExists } from "../utils/helpers.js";
import { StatusCodes } from "http-status-codes";
import ErrorResponse from "../utils/errors/index.js";
import asyncHandler from "../middleware/async.js";

const { CONFLICT, CREATED, BAD_REQUEST, OK, NOT_FOUND } = StatusCodes;

export const createAccount = asyncHandler(async (req, res) => {
    console.info("Creating new account...");

    const data = req.body;

    const accountAvailable = await checkAccountExists(data.account_number, "account_number");

    if (accountAvailable) {
        throw new ErrorResponse("Account already exists", CONFLICT);
    }

    let account = new Account(data);

    account = await account.save();

    if (!account) {
        throw new ErrorResponse("Could not create account", BAD_REQUEST);
    }

    res.status(CREATED).json({ message: "Account created successfully", account });
});

export const getAccount = asyncHandler(async (req, res) => {
    console.info("Getting Account details...");

    const account = await checkAccountExists(req.params.id, "_id");

    if (!account) {
        throw new ErrorResponse("Account not found", NOT_FOUND);
    }

    res.status(OK).json({ message: "Account retrieved successfully", account });
});

export const updateAccountWithId = asyncHandler(async (req, res) => {
    console.info("updating Account details using id...");

    const account = await checkAccountExists(req.params.id, "_id");

    if (!account) {
        throw new ErrorResponse("Account not found", NOT_FOUND);
    }

    const data = await Account.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });

    res.status(OK).json({ message: "Account updated successfully", account: data });
});

export const updateAccount = asyncHandler(async (req, res) => {
    console.info("updating Account details...");

    const account = await checkAccountExists(req.account_number, "account_number");

    if (!account) {
        throw new ErrorResponse("Account not found", NOT_FOUND);
    }

    const data = await Account.findOneAndUpdate({ account_number: req.account_number }, req.body, { new: true });

    res.status(OK).json({ message: "Account updated successfully", account: data });
});
