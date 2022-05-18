import * as Joi from 'joi';
import {indexValuesSchema} from './index-values';

export interface Meter {
    meter_id: number,
    meter_type: string,
    physical_id: string
}

export const meterSchema = indexValuesSchema.keys({
    meter_type: Joi.string().required(),
    physical_id: Joi.string().required()
});