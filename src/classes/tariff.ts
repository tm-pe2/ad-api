import * as Joi from 'joi';

export interface Tariff {
    TarifID: number,
    SmallInd: number,
    MediumInd: number,
    BigInd: number,
    SmallComp: number,
    MediumComp: number,
    BigComp: number
}

export const tariffSchema = Joi.object({
    TarifID: Joi.number().integer().min(0).required(),
    SmallInd: Joi.number().required(),
    MediumInd: Joi.number().required(),
    BigInd: Joi.number().required(),
    SmallComp: Joi.number().required(),
    MediumComp: Joi.number().required(),
    BigComp: Joi.number().required()
});
