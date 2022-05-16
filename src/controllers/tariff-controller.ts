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
        const addTariffSchema = tariffSchema.fork('tariff_id', field => field.optional());
        let tariff: Tariff = await addTariffSchema.validateAsync(req.body);

        if(await tariffService.insertTariff(tariff))
            res.status(200).json({
                message: "Tariff inserted successfully!"
            });
        else
            res.status(200).json({
                message: "An erro occurred when inserting tariff!"
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
        let tariff: Tariff = await tariffSchema.validateAsync(req.body);

        if(await tariffService.updateTariff(tariff))
            res.status(200).json({
                message: "Tariff updated successfully!"
            });
        else
            res.status(200).json({
                message: "An erro occurred when updating tariff!"
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
        if(await tariffService.deleteTariffById(Number(req.params.id)))
            res.status(200).json({
                message: "Tariff deleted successfully!"
            });
        else
            res.status(200).json({
                message: "An erro occurred when deleting tariff!"
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when deleting tariff'
        });
    }
};
