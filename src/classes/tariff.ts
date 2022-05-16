import * as Joi from 'joi';

export interface Tariff {
    tariff_id: number,
    small_ind: number,
    medium_ind: number,
    big_ind: number,
    small_comp: number,
    medium_comp: number,
    big_comp: number
}

export const tariffSchema = Joi.object({
    tariff_id: Joi.number().integer().min(0).required(),
    small_ind: Joi.number().required(),
    medium_ind: Joi.number().required(),
    big_ind: Joi.number().required(),
    small_comp: Joi.number().required(),
    medium_comp: Joi.number().required(),
    big_comp: Joi.number().required()
});
