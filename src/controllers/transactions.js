//@ts-check
import mongoose from "mongoose";
import Transaction from "../models/transactions.js";
import { checkAccountExists, checkAccount, updateAccount } from "../utils/helpers.js";
import { StatusCodes } from "http-status-codes";
import ErrorResponse from "../utils/errors/index.js";
import asyncHandler from "../middleware/async.js";
const { OK, NOT_FOUND } = StatusCodes;
const { startSession } = mongoose;

export const makeDeposit = asyncHandler(async (req, res) => {
    console.info("Making a deposit...");

    const amount = req.amount;
    const description = req.description;

    //check if recepient account exists
    let user = await checkAccount(req.account_number, "account_number");
    if (!user) {
        throw new ErrorResponse("Account not found", NOT_FOUND);
    }

    // create a transaction session
    const session = await startSession();
    let account;
    let transaction;
    await session.withTransaction(async () => {
        // retrieve bank balance
        const mainBank = await checkAccountExists("000000000", "account_number");

        // deduct from office bank account
        await updateAccount({ _id: mainBank._id }, { balance: mainBank.balance - amount }, { session });

        // fund receiver account
        account = await updateAccount({ _id: user._id }, { balance: user.balance + amount }, { session });

        //create transaction
        transaction = await Transaction.create(
            [{ sender_account_id: mainBank._id, receiver_account_id: account._id, amount, description }],
            { session },
        );
        session.commitTransaction();
    });
    // session.commitTransaction();
    session.endSession();

    res.status(OK).json({ message: "Account funded successfully", account, transaction });
});
