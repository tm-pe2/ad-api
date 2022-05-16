import * as Joi from 'joi';
import {indexValuesSchema} from './index-values';

export interface Meter {
    meter_id: number,
    meter_type: string,
    physical_id: number
}

export const meterSchema = indexValuesSchema.keys({
    meter_id: Joi.number().integer().min(0).required(),
    meter_type: Joi.string().required(),
    physical_id: Joi.number().integer().min(0).required()
});