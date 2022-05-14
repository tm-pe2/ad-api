import * as Joi from 'joi';

export interface Meter {
    meter_id: number,
    meter_type: string,
    physical_id: number
}

export const meterSchema = Joi.object({
    meter_id: Joi.number().integer().min(0).required(),
    meter_type: Joi.string().required(),
    physical_id: Joi.number().integer().min(0).required()
});