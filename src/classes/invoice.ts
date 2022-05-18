import * as Joi from 'joi';

export interface Invoice {
    invoice_id: number,
    contract_id: number,
    supplier_id: number,
    creation_date: Date,
    due_date: Date,
    status_id: number,
    price: number,
    tax: number,
    tariff_rate: number,
    period_start: Date,
    period_end: Date
}

export const invoiceSchema = Joi.object({
    invoice_id: Joi.number().integer().min(0).required(),
    contract_id: Joi.number().integer().min(0).required(),
    supplier_id: Joi.number().integer().min(0).required(),
    creation_date: Joi.date().min('1-1-1900').required(),
    due_date: Joi.date().min('1-1-1900').required(),
    status_id: Joi.number().required(),
    price: Joi.number().required(),
    tax: Joi.number().required(),
    start_date: Joi.date().min('1-1-1900').required(),
    end_date: Joi.date().min('1-1-1900').required()
});
