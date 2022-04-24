import * as Joi from 'joi';

export interface Estimation {
    EstimatedID: number,
    ServiceType: number,
    AdressID: number,
    BuildingType: number,
    FamilySize: number,
    PastConsumption: number,
    ElectricCar: number,
    Welness: number,
    HeatingType: number
}

export const estimationSchema = Joi.object({
    EstimatedID: Joi.number().integer().min(0).required(),
    ServiceType: Joi.number().required(),
    AdressID: Joi.number().integer().min(0).required(),
    BuildingType: Joi.number().required(),
    FamilySize: Joi.number().integer().min(1).required(),
    PastConsumption: Joi.number().required(),
    ElectricCar: Joi.number().integer().min(0).required(),
    Welness: Joi.number().required(),
    HeatingType: Joi.number().required()
});