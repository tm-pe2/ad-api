import * as Joi from 'joi';

export interface Invoice {
    invoice_id: number,
    customer_id: number,
    creation_date: Date,
    due_date: Date,
    status_id: number,
    price: number,
    start_date: Date,
    end_date: Date
    tariff_id: number
    contract_id: number
}

export const invoiceSchema = Joi.object({
    //invoice_id: Joi.number().integer().min(0).required(),
    customer_id: Joi.number().integer().min(0).required(),
    creation_date: Joi.date().min('1-1-1900').required(),
    due_date: Joi.date().min('1-1-1900').required(),
    status_id: Joi.number().required(),
    price: Joi.number().required(),
    start_date: Joi.date().required(),
    end_date: Joi.date().required(),
    tariff_id: Joi.number().required(),
    contract_id: Joi.number().required()
});
