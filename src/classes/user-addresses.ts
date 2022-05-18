import * as Joi from 'joi';

export interface UserAddress {
    user_id: number,
    address_id: number
}

export const userAddressesSchema = Joi.object({
    user_id: Joi.number().integer().min(0).required(),
    address_id: Joi.number().integer().min(0).required()
});
