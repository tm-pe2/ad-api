import {Request, RequestHandler, Response} from 'express';
import * as cityService from '../services/city-service';
import {City} from '../classes/city';
export const getAllCities = async (req: Request, res: Response) => {
    try{
        const cities = await cityService.getAllCities();
        res.status(200).json(
            cities
        );
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            message: 'There was an error when fetching cities'
        });
    }
}