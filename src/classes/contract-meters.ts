import * as Joi from 'joi';
import {indexValuesSchema} from './index-values'

export interface ContractMeters {
    contract_id: number,
    meter_id: number
}

export const contractMeterSchema = indexValuesSchema.keys({
    contract_id: Joi.number().integer().min(0).required(),
    meter_id: Joi.number().integer().min(0).required()
});
