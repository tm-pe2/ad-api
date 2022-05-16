import * as Joi from 'joi';

export interface Estimation {
    estimation_id: number,
    service_type: number,
    address_id: number,
    building_type: number,
    family_size: number,
    past_consumption: number,
    meters_number: number,
    meter_type: string,
    meter_value: number,
    meter_type2: string,
    meter_value2: number,
    meter_type3: string,
    meter_value3: number,
    equipments: string
}

export const estimationSchema = Joi.object({
    estimation_id: Joi.number().integer().min(0).required(),
    service_type: Joi.number().required(),
    address_id: Joi.number().integer().min(0).required(),
    building_type: Joi.number().required(),
    family_size: Joi.number().integer().min(1).required(),
    past_consumption: Joi.number().required(),
    meters_number: Joi.number().integer().min(1).required(),
    meter_type: Joi.string().required(),
    meter_value: Joi.number().integer().min(0).required(),
    meter_type2: Joi.string().required(),
    meter_value2: Joi.number().integer().min(0).required(),
    meter_type3: Joi.string().required(),
    meter_value3: Joi.number().integer().min(0).required(),
    equipments: Joi.string().required()
});
