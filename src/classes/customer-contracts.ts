import * as Joi from 'joi';

export interface CustomerContracts {
    customer_id: number,
    contract_id: number
}

export const customerContractSchema = Joi.object({
    customer_id: Joi.number().integer().min(0).required(),
    contract_id: Joi.number().integer().min(0).required()
});
