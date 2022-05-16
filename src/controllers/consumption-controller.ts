import {Request, RequestHandler, Response} from 'express';
import {Consumtion, cunsumtionSchema } from "../classes/consumption";
import * as consumptionServices from '../services/consumption-service';

export const getAllConsumptions: RequestHandler = async (req: Request, res: Response) => {
    try {
        const consumptions = await consumptionServices.getAllConsumptions();
        res.status(200).json({
            consumptions
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when fetching consumption!'
        });
    }
};

export const getConsumptionById: RequestHandler = async (req: Request, res: Response) => {
    try {
        const consumption = await consumptionServices.getConsumptionById(Number(req.params.id));

        res.status(200).json({
            consumption
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when fetching consumption!'
        });
    }
};

export const addMeter: RequestHandler = async (req: Request, res: Response) => {
    try {
        const addConsumptionSchema = cunsumtionSchema.fork(['consumption_id'],field => field.optional())
        const validatedConsumption = await addConsumptionSchema.validateAsync(req.body);

        if(await consumptionServices.insertConsumption(validatedConsumption)){
            res.status(200).json({
                message: "Consumption added succefully!"
            });
        }
        else{
            res.status(401).json({
                message: "An error occurred when inserting consumption!"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when adding new consumption!'
        });
    }
};

export const updateMeter: RequestHandler = async (req: Request, res: Response) => {
    try {
        //validate the request body
        let consumption: Consumtion = await cunsumtionSchema.validateAsync(req.body);

        if(await consumptionServices.updateConsumption(consumption)){
            res.status(200).json({
                message: "Consumption updated successfully!"
            });
        }
        else{
            res.status(401).json({
                message: "An error occurred when updating consumption!"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when updating consumption!'
        });
    }
};

export const deleteMeterById: RequestHandler = async (req: Request, res: Response) => {
    try {
        if(await consumptionServices.deleteConsumption(Number(req.params.id))){
            res.status(200).json({
                message: "Consumption deleted successfully!"
            });
        }
        else{
            res.status(401).json({
                message: "An error occurred when deleting consumption!"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when deleting consumption!'
        });
    }
};
