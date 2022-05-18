import * as Joi from 'joi';
import { User } from './user';

export interface Planning extends User {
    planning_id: number,
    employee_id: number,
    contract_id: number,
    date: Date,
    status: number
}

export const planningSchema = Joi.object({
    planning_id: Joi.number().integer().min(0).required(),
    employee_id: Joi.number().integer().min(0).required(),
    contract_id: Joi.number().integer().min(0).required(),
    date: Joi.date().min('1-1-1900').required(),
    status: Joi.number().required()
});
