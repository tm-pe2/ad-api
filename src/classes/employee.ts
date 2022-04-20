import * as Joi from 'joi';
import {User} from '../classes/user';

export interface Employee extends User{
    EmployeeID: number,
    Departement: string
    Permissions: number,
    HireDate: Date,
    Gender: number
}

export const employeeSchema = Joi.object({
    EmployeeID: Joi.number().integer().min(0).required(),
    Departement: Joi.string().required(),
    Permissions: Joi.number().required(),
    HireDate: Joi.date().min('1-1-1900').required(),
    Gender: Joi.number().required()
});
