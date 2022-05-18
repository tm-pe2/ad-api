import * as Joi from 'joi';
import {estimationSchema} from './estimation';

export interface Contract{
    contract_id: number,
    start_date: Date,
    end_date: Date,
    customer_type: string,
    tariff_id: number,
    estimation_id: number,
    address_id: number,
    service_type: number,
    status: string
}

export const contractSchema = estimationSchema.keys({
    contract_id: Joi.number().integer().min(0).required(),
    start_date: Joi.date().required(),
    end_date:  Joi.date().required(),
    customer_type:  Joi.string().required(),
    tariff_id: Joi.number().integer().min(0).required(),
    estimation_id: Joi.number().integer().min(0).required(),
    address_id: Joi.number().integer().min(0).required(),
    service_type: Joi.number().integer().min(0).required(),
    status: Joi.string().min(0).required()
});
