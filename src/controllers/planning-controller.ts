import {Request, RequestHandler, Response} from 'express';
import {Planning} from '../classes/planning';
import * as planningService from '../services/planning-service';

export const getAllPlannings: RequestHandler = async (req: Request, res: Response) => {
    try {
        const plannings = await planningService.getAllPlannings();

        res.status(200).json({
            plannings
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when fetching plannings'
        });
    }
};

export const getPlanningById: RequestHandler = async (req: Request, res: Response) => {
    try {
        const planning = await planningService.getPlanningById(Number(req.params.id));

        res.status(200).json({
            planning
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when fetching planning'
        });
    }
};

export const addPlanning: RequestHandler = async (req: Request, res: Response) => {
    try {
        let obj = req.body
        let planning: Planning = new Planning(null, obj.employeeId, obj.customerId, obj.date, obj.status);

        const result = await planningService.insertPlanning(planning);

        res.status(200).json({
            result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when adding new planning'
        });
    }
};

export const updatePlanning: RequestHandler = async (req: Request, res: Response) => {
    try {
        let obj = req.body
        let planning: Planning = new Planning(obj.planningId, obj.employeeId, obj.customerId, obj.date, obj.status);

        const result = await planningService.updatePlanning(planning);

        res.status(200).json({
            result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when updating planning'
        });
    }
};

export const deletePlanningById: RequestHandler = async (req: Request, res: Response) => {
    try {
        const result = await planningService.deletePlanningById(Number(req.params.id));

        res.status(200).json({
            result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when deleting planning'
        });
    }
};
