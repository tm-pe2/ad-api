import {Request, RequestHandler, Response} from 'express';
import {Tariff, tariffSchema} from '../classes/tariff';
import * as tariffService from '../services/tariff-service';

export const getAllTariffs: RequestHandler = async (req: Request, res: Response) => {
    try {
        const tariffs = await tariffService.getAllTariffs();

        res.status(200).json({
            tariffs
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when fetching tariffs!'
        });
    }
};

export const getTariffById: RequestHandler = async (req: Request, res: Response) => {
    try {
        const tariff = await tariffService.getTariffById(Number(req.params.id));

        res.status(200).json({
            tariff
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when fetching tariff!'
        });
    }
};

export const addTariff: RequestHandler = async (req: Request, res: Response) => {
    try {
        //validate the request body
        const validationResult = await tariffSchema.validateAsync(req.body);
        let tariff: Tariff = validationResult;
        const result = await tariffService.insertTariff(tariff);

        res.status(200).json({
            result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when adding new tariff!'
        });
    }
};

export const updateTariff: RequestHandler = async (req: Request, res: Response) => {
    try {
        //validate the request body
        const validationResult = await tariffSchema.validateAsync(req.body);
        let tariff: Tariff = validationResult;
        const result = await tariffService.updateTariff(tariff);

        res.status(200).json({
            result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when updating tariff!'
        });
    }
};

export const deleteTariffById: RequestHandler = async (req: Request, res: Response) => {
    try {
        const result = await tariffService.deleteTariffById(Number(req.params.id));

        res.status(200).json({
            result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when deleting tariff'
        });
    }
};
