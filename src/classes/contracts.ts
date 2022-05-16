import * as Joi from 'joi';
import { Customer } from './customer';

export interface Contract extends Customer{
    contract_id: number,
    start_date: Date,
    end_date: Date,
    customer_id: number,
    customer_type: string,
    advance_payment: number,
    price: number,
    tariff_id: number,
    estimation_id: number,
    address_id: number,
    contract_type: number
}

export const contractSchema = Joi.object({
    contract_id: Joi.number().integer().min(0).required(),
    start_date: Joi.date().min('1-1-2000').required(),
    end_date:  Joi.date().min('1-1-2000').required(),
    customer_id:  Joi.number().integer().min(0).required(),
    customer_type:  Joi.string().required(),
    advance_payment:  Joi.number().required(),
    price: Joi.number().required(),
    tariff_id: Joi.number().integer().min(0).required(),
    estimation_id: Joi.number().integer().min(0).required(),
    address_id: Joi.number().integer().min(0).required(),
    contract_type: Joi.number().integer().min(0).required()
});
