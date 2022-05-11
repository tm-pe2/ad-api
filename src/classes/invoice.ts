import * as Joi from 'joi';

export interface Invoice {
    InvoiceID: number,
    CustomerID: number,
    SupplierID: number,
    Date: Date,
    DueDate: Date,
    Statusid: InvoiceStatus,
    GasAmount: number,
    ElectricityType: number,
    Price: number,
    Tax: number,
    StartDate: Date, //?
    EndDate: Date, //?
}

//move to db table?
export enum InvoiceStatus {
    sent,
    paid,
    overdue,
    void,
    writeOff,
    draft 
 }

export const invoiceSchema = Joi.object({
    InvoiceID: Joi.number().integer().min(0).required(),
    CustomerID: Joi.number().integer().min(0).required(),
    SupplierID: Joi.number().integer().min(0).required(),
    Date: Joi.date().min('1-1-1900').required(),
    DueDate: Joi.date().min('1-1-1900').required(),
    Status: Joi.number().required(),
    GasAmount: Joi.number().required(),
    ElectricityType: Joi.number().required(),
    Price: Joi.number().required(),
    Tax: Joi.number().required(),
    StartDate: Joi.date().min('1-1-1900').required(),
    EndDate: Joi.date().min('1-1-1900').required()
});
