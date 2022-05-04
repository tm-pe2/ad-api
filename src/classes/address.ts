import * as Joi from 'joi';

export interface Address {
    AdressID: number,
    City: string,
    Street: string,
    HouseNumber: string,
    PostalCode: string,
    Country: string,
    StartDate: Date,
    EndDate: Date  
}

export const addressSchema = Joi.object({
    AdressID: Joi.number().integer().min(0).required(),
    City: Joi.string().required(),
    Street:  Joi.string().required(),
    HouseNumber:  Joi.string().required(),
    PostalCode:  Joi.string().required(),
    Country:  Joi.string().required(),
    StartDate: Joi.date().min('1-1-2000'),
    EndDate: Joi.date()
});