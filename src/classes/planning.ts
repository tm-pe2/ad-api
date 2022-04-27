import * as Joi from 'joi';

export interface Planning {
    PlanningID: number,
    EmployeeID: number,
    CustomerID: number,
    Date: Date,
    Status: number
}

export const planningSchema = Joi.object({
    PlanningID: Joi.number().integer().min(0).required(),
    EmployeeID: Joi.number().integer().min(0).required(),
    CustomerID: Joi.number().integer().min(0).required(),
    Date: Joi.date().min('1-1-1900').required(),
    Status: Joi.number().required()
});
