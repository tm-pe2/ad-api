import {Request, RequestHandler, Response} from 'express';
import {Meter, meterSchema } from "../classes/meters";
import * as contractMeterServices from '../services/contract-meters-service';
import * as meterServies from '../services/meter-service';
import * as indexValuesServices from '../services/index-values-services';
import * as meterValidation from '../validations/meter-validation';

export const getAllMeters: RequestHandler = async (req: Request, res: Response) => {
    try {
        const meters = await meterServies.getAllMeters();
        res.status(200).json({
            meters
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when fetching contracts'
        });
    }
};

export const getMeterById: RequestHandler = async (req: Request, res: Response) => {
    try {
        const meter = await meterServies.getMeterById(Number(req.params.id));

        res.status(200).json({
            meter
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when fetching contract'
        });
    }
};

export const addMeter: RequestHandler = async (req: Request, res: Response) => {
    try {

        const addMeterSchema = meterSchema.fork([],field => field.optional())
        const validatedMeter = await addMeterSchema.validateAsync(req.body);

        const validationResult = await meterValidation.checkMeter(validatedMeter);
        if( validationResult != '')
        {
            throw new Error(validationResult);
        }

        //insert meter
        const meterID = await meterServies.insertMeter(validatedMeter);

        // insert contract meter
        const resultCM = await contractMeterServices.insertContractMeters(validatedMeter);

        //insert meter index values 
        validatedMeter.meter_id = meterID;
        const result = await indexValuesServices.insertIndexValue(validatedMeter);

        res.status(200).json({
            result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
};

export const updateMeter: RequestHandler = async (req: Request, res: Response) => {
    try {
        //validate the request body
        let meter: Meter = await meterSchema.validateAsync(req.body);

        const result = await meterServies.updateMeter(meter);

        res.status(200).json({
            result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when updating contract'
        });
    }
};

export const deleteMeterById: RequestHandler = async (req: Request, res: Response) => {
    try {
        const result = await meterServies.deleteMeter(Number(req.params.id));

        res.status(200).json({
            result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when deleting contract'
        });
    }
};
