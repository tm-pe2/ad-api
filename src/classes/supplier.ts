import * as Joi from 'joi';

export interface Supplier {
    SupplierID: number,
    Name: string,
    SupplyType: string,
    CompanyName: string,
    AdressID: number
}

export const supplierSchema = Joi.object({
    SupplierID: Joi.number().integer().min(0).required(),
    Name: Joi.string().required(),
    SupplyType: Joi.string().required(),
    CompanyName: Joi.string().required(),
    AdressID: Joi.number().integer().min(0).required()
});

