import * as Joi from 'joi';
import {Invoice, invoiceSchema} from './invoice';

export interface AnnualInvoice extends Invoice{
    annual_invoice_id: number,
    actual_consumption: number,
    advances_paid: number
}

export const annualInvoiceSchema = invoiceSchema.keys({
    actual_consumption: Joi.number().min(0).required(),
    advances_paid: Joi.number().min(0).required()
});
