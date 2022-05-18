//@ts-check
import Account from "../models/accounts.js";

/**
 * @param {any} param
 * @param {string} attribute
 */
export async function checkAccountExists(param, attribute) {
    const query =
        attribute == "_id"
            ? { _id: param }
            : attribute == "account_number"
            ? { account_number: param }
            : { account_name: param };
    return await Account.findOne(query).select("+disabled_at");
}

/**
 * @param {any} param
 * @param {string} attribute
 */
export async function checkAccount(param, attribute) {
    const query =
        attribute == "_id"
            ? { _id: param }
            : attribute == "account_number"
            ? { account_number: param }
            : { account_name: param };

    query.disabled_at = null;
    return await Account.findOne(query);
}

/**
 * @param {import("mongoose").FilterQuery<any>} query
 * @param {import("mongoose").UpdateQuery<any>} update
 */
export async function updateAccount(query, update, opts = null) {
    const updated = await Account.updateOne(query, update, { new: true, opts }).lean();
    if (updated.modifiedCount == 1) {
        return await Account.findOne({ query });
    }
    throw { message: "Something went wrong, could not update" };
}
