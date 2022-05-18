import {Request, RequestHandler, Response} from 'express';
import {Planning, planningSchema} from '../classes/planning';
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
            message: 'There was an error when fetching planning!'
        });
    }
};

export const getPlanningByEmployeeId: RequestHandler = async (req: Request, res: Response) => {
    try {
        const planning = await planningService.getPlanningByEmployeeId(Number(req.params.id));

        res.status(200).json({
            planning
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when fetching planning!'
        });
    }
};

export const getPlanninDetailsById: RequestHandler = async (req: Request, res: Response) => {
    try {
        const planning = await planningService.getPlanningDetailsById(Number(req.params.id));

        res.status(200).json({
            planning
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when fetching planning!'
        });
    }
};

export const addPlanning: RequestHandler = async (req: Request, res: Response) => {
    try {
        //validate the request body
        const addPlanningSchema = planningSchema.fork('planning_id', field => field.optional());
        let planning: Planning = await addPlanningSchema.validateAsync(req.body);

        if(await planningService.insertPlanning(planning))
            res.status(200).json({
                message: "Planning inserted successfully!"
            });
        else
            res.status(401).json({
                message: "An error occured when inserting planning!"
            });  
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when inserting new planning!'
        });
    }
};

export const updatePlanning: RequestHandler = async (req: Request, res: Response) => {
    try {
        //validate the request body
        let planning: Planning = await planningSchema.validateAsync(req.body);

        if(await planningService.updatePlanning(planning))
            res.status(200).json({
                message: "Planning updated successfully!"
            });
        else
            res.status(401).json({
                message: "An error occured when updating planning!"
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when updating planning!'
        });
    }
};

export const deletePlanningById: RequestHandler = async (req: Request, res: Response) => {
    try {
        if(await planningService.deletePlanningById(Number(req.params.id)))
            res.status(200).json({
                message: "Planning deleted successfully!"
            });
        else
            res.status(401).json({
                message: "An error occured when deleting planning!"
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when deleting planning!'
        });
    }
};
