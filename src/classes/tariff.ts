import * as Joi from 'joi';

export interface Tariff {
    tariff_id: number,
    customer_type: string,
    value: number
}

export const tariffSchema = Joi.object({
    tariff_id: Joi.number().integer().min(0).required(),
    customer_type: Joi.string().required(),
    value: Joi.number().required()
});
