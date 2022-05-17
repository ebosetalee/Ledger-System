import Joi from "joi";

const CREATE = Joi.object().keys({
    account_number: Joi.string().required().min(9),
    account_name: Joi.string().required(),
    balance: Joi.number().optional(),
});

const UPDATE = Joi.object().keys({
    account_number: Joi.string().required().min(9),
});

const DEPOSIT = Joi.object().keys({
    account_number: Joi.string().required().min(9),
    amount: Joi.number().required(),
    description: Joi.string().optional(),
});

export default {
    CREATE,
    UPDATE,
    DEPOSIT,
};
