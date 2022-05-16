import * as Joi from 'joi';
import {indexValuesSchema} from './index-values';

export interface Estimation {
    estimation_id: number,
    service_type: number,
    address_id: number,
    building_type: number,
    family_size: number,
    past_consumption: number,
    equipments: string,
    estimated_consumption: number
}

export const estimationSchema = Joi.object({
    estimation_id: Joi.number().integer().min(0).required(),
    service_type: Joi.number().required(),
    address_id: Joi.number().integer().min(0).required(),
    building_type: Joi.number().required(),
    family_size: Joi.number().integer().min(1).required(),
    past_consumption: Joi.number().required(),
    equipments: Joi.string().required(),
    estimated_consumption: Joi.number().integer().min(1).required()
});
