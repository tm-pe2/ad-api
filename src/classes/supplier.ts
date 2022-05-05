import * as Joi from 'joi';

export interface Supplier {
    supplier_id: number,
    name: string,
    supply_type: string,
    company_name: string,
    address_id: number
}

export const supplierSchema = Joi.object({
    supplier_id: Joi.number().integer().min(0).required(),
    name: Joi.string().required(),
    supply_type: Joi.string().required(),
    company_name: Joi.string().required(),
    address_id: Joi.number().integer().min(0).required()
});

