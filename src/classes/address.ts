import * as Joi from 'joi';
import { UserAddress, userAddressesSchema } from './user-addresses';

export interface Address extends UserAddress{
    address_id: number,
    city: string,
    street: string,
    house_number: string,
    postal_code: string,
    country: string,
}

export const addressSchema = userAddressesSchema.keys({
    address_id: Joi.number().integer().min(0).required(),
    city: Joi.string().required(),
    street:  Joi.string().required(),
    house_number:  Joi.string().required(),
    postal_code:  Joi.string().required(),
    country:  Joi.string().required(),
});
