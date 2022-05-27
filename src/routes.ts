import express, {Express} from 'express';
import {Request, Response, NextFunction} from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { AuthController } from './controllers/auth';

export function setRoutes(router: Express): Express {
    router.use(cors()); // enable CORS
    router.use(morgan('dev')); // Logging
    router.use(express.urlencoded({extended: false})); // Parse the request
    router.use(express.json()); //Takes care of JSON data
    router.use(bodyParser.json());

    router.use((req: Request, res: Response, next: NextFunction) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
        // set the CORS method headers
        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
            return res.status(200).json({});
        }
        next();
    });

    // Setting routes
    // router.use('/auth', AuthController.router());

    // Handle 404
    router.use((req: Request, res: Response, next: NextFunction) => {
        if (!res.writableFinished)
            res.sendStatus(404);
        next();
    });

    return router;
}
