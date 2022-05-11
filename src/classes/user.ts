import * as Joi from 'joi';
import {Address, addressSchema} from './address';

export interface User extends Address {
    user_id: number,
    role_id: number,
    first_name: string,
    last_name: string,
    birth_date: Date,
    address_id: number,
    email: string,
    phone_number: string,
    password: string,
    national_registry_number: string
}

export const userSchema = addressSchema.keys({
    user_id: Joi.number().integer().min(0).required(),
    role_id: Joi.number().integer().min(0).required(),
    first_name: Joi.string().required(),
    last_name:  Joi.string().required(),
    birth_date:  Joi.date().min('1-1-1900').required(),
    address_id:  Joi.number().integer().min(0).required(),
    email:  Joi.string().email(),
    phone_number: Joi.string().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,50}$')).required(),
    national_registry_number: Joi.string().required()
});
