import { Request, RequestHandler, Response, Router } from 'express';
import * as cityService from '../services/city';
import { City } from '../models/city';

export class CityController {
    static router(): Router {
        return Router({ caseSensitive: false })
            .get('/', async (req, res, next) => {

                try {
                    const cities = await cityService.getAllCities();
                    res.status(200).json(
                        cities.rows
                    );
                }
                catch (error) {
                    console.log(error);
                    res.status(500).json({
                        message: 'There was an error when fetching cities'
                    });
                }
            })
    }
}