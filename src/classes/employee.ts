import * as Joi from 'joi';
import {User, userSchema} from './user';

export interface Employee extends User{
    employee_id: number,
    department: string
    permissions: number,
    hire_date: Date,
    gender: number,
    salary: number,
    user_id: number
}

export const employeeSchema = userSchema.keys({
    employee_id: Joi.number().integer().min(0).required(),
    department: Joi.string().required(),
    permissions: Joi.number().required(),
    hire_date: Joi.date().min('1-1-1900').required(),
    gender: Joi.number().required(),
    salary: Joi.number().required(),
    user_id: Joi.number().required()
});

export const updateEmployeeSchema = Joi.object({
    employee_id: Joi.number().integer().min(0).required(),
    department: Joi.string().required(),
    permissions: Joi.number().required(),
    hire_date: Joi.date().min('1-1-1900').required(),
    gender: Joi.number().required(),
    salary: Joi.number().required()
});
