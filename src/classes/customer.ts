import * as Joi from 'joi';
import {User, userSchema} from './user';

export interface Customer extends User {
    customer_id: number,
    gas_type: number,
    electricity_type: number,
    gas_meter_id: number,
    electricity_meter_id: number
}

export const customerSchema = userSchema.keys({
    customer_id: Joi.number().integer().min(0).required(),
    gas_type: Joi.number().integer().required(),
    electricity_type: Joi.number().integer().required(),
    gas_meter_id: Joi.number().integer().required(),
    electricity_meter_id: Joi.number().integer().required(),
});
