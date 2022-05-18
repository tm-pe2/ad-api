import * as Joi from 'joi';
import {User, userSchema} from './user';

export interface Customer extends User {
    customer_id: number,
    user_id: number,
    customer_type: string
}

export const customerSchema = userSchema.keys({
    customer_id: Joi.number().integer().min(0).required(),
    user_id: Joi.number().integer().min(0).required(),
    customer_type: Joi.string().min(1).required()
});
