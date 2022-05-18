import {Request, RequestHandler, Response} from 'express';
import {Estimation, estimationSchema} from '../classes/estimation';
import * as estimationService from '../services/estimation-service';

export const getAllEstimations: RequestHandler = async (req: Request, res: Response) => {
    try {
        const estimations = await estimationService.getAllEstimations();

        res.status(200).json({
            estimations
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when fetching estimations'
        });
    }
};

export const getEstimationById: RequestHandler = async (req: Request, res: Response) => {
    try {
        const estimation = await estimationService.getEstimationById(Number(req.params.id));

        res.status(200).json({
            estimation
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when fetching estimation'
        });
    }
};

export const getEstimationByCustomerId: RequestHandler = async (req: Request, res: Response) => {
    try {
        const estimation = await estimationService.getEstimationByCustomerId(Number(req.params.id));

        res.status(200).json({
            estimation
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when fetching estimation'
        });
    }
};

export const addEstimation: RequestHandler = async (req: Request, res: Response) => {
    try {
        //validate the request body
        const addEstimationSchema = estimationSchema.fork('estimation_id', field => field.optional());
        let estimation: Estimation = await addEstimationSchema.validateAsync(req.body);

        if(await estimationService.insertEstimation(estimation)){
            res.status(200).json({
                message: "Esstimation inserted succesfully!"
            });
        }
        else{
            res.status(401).json({
                message: "An error occured!"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when adding new estimation'
        });
    }
};

export const updateEstimation: RequestHandler = async (req: Request, res: Response) => {
    try {
        //validate the request body
        let estimation: Estimation = await estimationSchema.validateAsync(req.body);
        if(await estimationService.updateEstimation(estimation)){
            res.status(200).json({
                message: "Esstimation updated succesfully!"
            });
        }
        else{
            res.status(401).json({
                message: "An error occured!"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when updating estimation'
        });
    }
};

export const deleteEstimationById: RequestHandler = async (req: Request, res: Response) => {
    try {
        if(await estimationService.deleteEstimationById(Number(req.params.id))){
            res.status(200).json({
                message: "Esstimation deleted succesfully!"
            });
        }
        else{
            res.status(401).json({
                message: "An error occured!"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when deleting estimation'
        });
    }
};
