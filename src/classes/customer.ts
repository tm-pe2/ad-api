import * as Joi from 'joi';
import {User} from '../classes/user';

export interface Customer extends User {
    CustomerID: number,
    GasType: number,
    Electricitytype: number
}

export const customerSchema = Joi.object({
    CustomerID: Joi.number().integer().min(0).required(),
    GasType: Joi.number().integer().required(),
    Electricitytype: Joi.number().integer().required()
});
