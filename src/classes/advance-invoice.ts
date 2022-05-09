import * as Joi from 'joi';
import {Invoice, invoiceSchema} from './invoice';

export interface AdvanceInvoice extends Invoice{
    advance_invoice_id: number;
    invoice_id: number;
    estimated_consumption: number;
}

export const advanceInvoiceSchema = invoiceSchema.keys({
    estimated_consumption: Joi.number().min(0).required(),
});
