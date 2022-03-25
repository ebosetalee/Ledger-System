//@ts-check
import Account from "../models/accounts.js";

export async function checkAccountExists(param, attribute) {
    const query =
        attribute == "_id"
            ? { _id: param }
            : attribute == "account_number"
            ? { account_number: param }
            : { account_name: param };
    return await Account.findOne(query).select("+disabled_at");
}

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
