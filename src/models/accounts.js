import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
    {
        account_number: {
            type: String,
            required: true,
            unique: true,
        },
        account_name: {
            type: String,
            required: true,
        },
        balance: {
            type: Number,
            default: 0,
        },
        disabled_at: {
            type: Date,
            select: false,
            default: null,
        },
    },
    {
        timestamps: true,
    },
);

const Account = mongoose.model("Account", accountSchema);

export default Account;
