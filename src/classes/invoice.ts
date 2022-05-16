import * as Joi from 'joi';

export interface Invoice {
    invoice_id: number,
    customer_id: number,
    supplier_id: number,
    creation_date: Date,
    due_date: Date,
    status_id: number,
    gas_amount: number,
    electricity_type: number,
    price: number,
    tax: number,
    start_date: Date,
    end_date: Date
}

export const invoiceSchema = Joi.object({
    invoice_id: Joi.number().integer().min(0).required(),
    customer_id: Joi.number().integer().min(0).required(),
    supplier_id: Joi.number().integer().min(0).required(),
    creation_date: Joi.date().min('1-1-1900').required(),
    due_date: Joi.date().min('1-1-1900').required(),
    status_id: Joi.number().required(),
    gas_amount: Joi.number().required(),
    electricity_type: Joi.number().required(),
    price: Joi.number().required(),
    tax: Joi.number().required(),
    start_date: Joi.date().min('1-1-1900').required(),
    end_date: Joi.date().min('1-1-1900').required()
});
