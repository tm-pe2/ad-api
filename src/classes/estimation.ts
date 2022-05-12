import * as Joi from 'joi';

export interface Estimation {
    estimation_id: number,
    service_type: number,
    address_id: number,
    building_type: number,
    family_size: number,
    past_consumption: number,
    electric_car: number,
    wellness: number,
    heating_type: number
}

export const estimationSchema = Joi.object({
    estimation_id: Joi.number().integer().min(0).required(),
    service_type: Joi.number().required(),
    address_id: Joi.number().integer().min(0).required(),
    building_type: Joi.number().required(),
    family_size: Joi.number().integer().min(1).required(),
    past_consumption: Joi.number().required(),
    electric_car: Joi.number().integer().min(0).required(),
    wellness: Joi.number().required(),
    heating_type: Joi.number().required()
});
