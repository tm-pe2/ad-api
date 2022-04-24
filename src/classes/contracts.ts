import * as Joi from 'joi';

export interface Contract {
    ContractID: number,
    StartDate: Date,
    EndDate: Date,
    CustomerID: number,
    CustomerType: string,
    AdvancedPayement: number,
    Price: number,
    TarifID: number,
    EstimatedID: number
}

export const contractSchema = Joi.object({
    ContractID: Joi.number().integer().min(0).required(),
    StartDate: Joi.date().min('1-1-2000').required(),
    EndDate:  Joi.date().min('1-1-2000').required(),
    CustomerID:  Joi.number().integer().min(0).required(),
    CustomerType:  Joi.string().required(),
    AdvancedPayement:  Joi.number().required(),
    Price: Joi.number().required(),
    TarifID: Joi.number().integer().min(0).required(),
    EstimatedID: Joi.number().integer().min(0).required()
});
