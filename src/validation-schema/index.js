import Joi from "joi";

const CREATE = Joi.object().keys({
    account_number: Joi.number().required().min(9),
    account_name: Joi.string().required(),
    balance: Joi.number().optional(),
});

const UPDATE = Joi.object().keys({
    account_number: Joi.number().required().min(9),
});

export default {
    CREATE,
    UPDATE,
};
