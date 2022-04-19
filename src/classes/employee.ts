import * as Joi from 'joi';

export interface Employee {
    EmployeeID: number,
    FirstName: string,
    LastName: string,
    BirthDate: Date,
    AdressID: number,
    Email: string,
    PhoneNumber: string,
    Password: string,
    Departement: string
    Permissions: number,
    HireDate: Date,
    Gender: number
}

export const employeeSchema = Joi.object({
    EmployeeID: Joi.number().integer().min(0).required(),
    FirstName: Joi.string().required(),
    LastName:  Joi.string().required(),
    BirthDate:  Joi.date().min('1-1-1900').required(),
    AdressID:  Joi.number().integer().min(0).required(),
    Email:  Joi.string().email(),
    PhoneNumber: Joi.string().required(),
    Password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,50}$')).required(),
    Departement: Joi.string().required(),
    Permissions: Joi.number().required(),
    HireDate: Joi.date().min('1-1-1900').required(),
    Gender: Joi.number().required()
});
