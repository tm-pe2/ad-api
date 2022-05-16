import * as Joi from 'joi';

export interface ContractMeters {
    contract_id: number,
    meter_id: number
}

export const contractMeterSchema = Joi.object({
    contract_id: Joi.number().integer().min(0).required(),
    meter_id: Joi.number().integer().min(0).required()
});
