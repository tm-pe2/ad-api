import * as Joi from 'joi';

export interface Address {
    address_id: number,
    city: string,
    street: string,
    house_number: string,
    postal_code: string,
    country: string,
    start_date: Date,
    end_date: Date
}

export const addressSchema = Joi.object({
    address_id: Joi.number().integer().min(0).required(),
    city: Joi.string().required(),
    street:  Joi.string().required(),
    house_number:  Joi.string().required(),
    postal_code:  Joi.string().required(),
    country:  Joi.string().required(),
    start_date: Joi.date().min('1-1-2000'),
    end_date: Joi.date()
});
