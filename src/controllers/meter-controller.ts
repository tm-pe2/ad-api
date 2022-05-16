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
            message: 'There was an error when fetching meters!'
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
            message: 'There was an error when fetching meter!'
        });
    }
};

export const addMeter: RequestHandler = async (req: Request, res: Response) => {
    try {

        const addMeterSchema = meterSchema.fork(['meter_id', 'index_id'],field => field.optional())
        const validatedMeter = await addMeterSchema.validateAsync(req.body);

        const validationResult = await meterValidation.checkMeter(validatedMeter);
        if( validationResult != '')
        {
            throw new Error(validationResult);
        }

        //insert meter
        const meterID = await meterServies.insertMeter(validatedMeter);
        if(meterID){
            validatedMeter.meter_id = meterID;
            // insert contract meter
            if(await contractMeterServices.insertContractMeters(validatedMeter)){
                //insert meter index values 
                if(await indexValuesServices.insertIndexValue(validatedMeter))
                {
                    res.status(200).json({
                        message: "Meter added succefully!"
                    });
                }
                else
                {
                    res.status(401).json({
                        message: "An error occurred when inserting index values!"
                    });
                }
            }
            else
            {
                res.status(401).json({
                    message: "An error occurred when inserting contract-meter!"
                });
            }
        }
        else{
            res.status(401).json({
                message: "An error occurred when inserting meter!"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when adding new meter!'
        });
    }
};

export const updateMeter: RequestHandler = async (req: Request, res: Response) => {
    try {
        //validate the request body
        let meter: Meter = await meterSchema.validateAsync(req.body);

        if(await meterServies.updateMeter(meter)){
            res.status(200).json({
                message: "Meter updated successfully!"
            });
        }
        else{
            res.status(401).json({
                message: "An error occurred when updating meter!"
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when updating meter!'
        });
    }
};

export const deleteMeterById: RequestHandler = async (req: Request, res: Response) => {
    try {
        if(await meterServies.deleteMeter(Number(req.params.id))){
            res.status(200).json({
                message: "Meter deleted successfully!"
            });
        }
        else{
            res.status(401).json({
                message: "An error occurred when deleting meter!"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when deleting meter!'
        });
    }
};
