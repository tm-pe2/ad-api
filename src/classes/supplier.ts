import {Address, addressSchema} from './address';
import * as Joi from 'joi';

export interface Supplier extends Address {
    supplier_id: number,
    name: string,
    supply_type: string,
    company_name: string,
    address_id: number,
    vat_number: string
}

export const supplierSchema = addressSchema.keys({
    supplier_id: Joi.number().integer().min(0).required(),
    name: Joi.string().required(),
    supply_type: Joi.string().required(),
    company_name: Joi.string().required(),
    address_id: Joi.number().integer().min(0).required(),
    vat_number: Joi.string().required()
});

