import * as Joi from 'joi';

export interface IndexValues {
    index_id: number,
    meter_id: number,
    date: Date,
    index_value: number
}

export const indexValuesSchema = Joi.object({
    contract_id: Joi.number().integer().min(0).required(),
    meter_id: Joi.number().integer().min(0).required(),
    date: Joi.date().required(),
    index_value: Joi.number().integer().min(0).required()
});
