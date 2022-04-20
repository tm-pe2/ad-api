import * as Joi from 'joi';

export interface User {
    UserID: number,
    RoleID: number,
    FirstName: string,
    LastName: string,
    BirthDate: Date,
    AddressID: number,
    Email: string,
    PhoneNumber: string,
    Password: string,
}

export const userSchema = Joi.object({
    UserID: Joi.number().integer().min(0).required(),
    RoleID: Joi.number().integer().min(0).required(),
    FirstName: Joi.string().required(),
    LastName:  Joi.string().required(),
    BirthDate:  Joi.date().min('1-1-1900').required(),
    AddressID:  Joi.number().integer().min(0).required(),
    Email:  Joi.string().email(),
    PhoneNumber: Joi.string().required(),
    Password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,50}$')).required(),
});
