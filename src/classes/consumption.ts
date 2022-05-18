import * as Joi from 'joi';

export interface Consumption {
    consumption_id: number,
    meter_id: number,
    consumption: number,
    date: Date
}

export const cunsumptionSchema = Joi.object({
    consumption_id: Joi.number().integer().min(0).required(),
    meter_id: Joi.number().integer().min(0).required(),
    consumtion: Joi.number().integer().min(0).required(),
    date: Joi.date().required()
});