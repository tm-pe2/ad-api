import * as Joi from 'joi';
import { Customer } from './customer';

export interface Contract extends Customer{
    contract_id: number,
    start_date: Date,
    end_date: Date,
    customer_type: string,
    tariff_id: number,
    estimation_id: number,
    address_id: number,
    service_type: number
}

export const contractSchema = Joi.object({
    contract_id: Joi.number().integer().min(0).required(),
    start_date: Joi.date().min('1-1-2000').required(),
    end_date:  Joi.date().min('1-1-2000').required(),
    customer_type:  Joi.string().required(),
    tariff_id: Joi.number().integer().min(0).required(),
    estimation_id: Joi.number().integer().min(0).required(),
    address_id: Joi.number().integer().min(0).required(),
    service_type: Joi.number().integer().min(0).required()
});
