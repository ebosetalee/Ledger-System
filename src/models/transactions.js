import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
    {
        sender_account_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Account",
        },
        receiver_account_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Account",
        },
        amount: {
            type: Number,
            default: 0,
            required: true,
        },
        description: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
