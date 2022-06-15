import express, {Express} from 'express';
import {Request, Response, NextFunction} from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { AuthController } from './controllers/auth';
import { UserController } from './controllers/user';
import { CityController } from './controllers/city';
import { CustomerController } from './controllers/customer';
import { InvoiceController } from './controllers/invoice';
import { ContractController } from './controllers/contract';
import { RolesController } from './controllers/roles';
import { EmployeeController } from './controllers/employee';
import { EstimationController } from './controllers/estimation';
import { ConsumptionController } from './controllers/consumption';
import { PlanningController } from './controllers/planning';
import { SupplierController } from './controllers/supplier';

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
    router.use('/auth', AuthController.router());
    router.use('/users', UserController.router());
    router.use('/cities', CityController.router());
    router.use('/customers', CustomerController.router());
    router.use('/invoices', InvoiceController.router());
    router.use('/contracts', ContractController.router());
    router.use('/roles', RolesController.router());
    router.use('/employees', EmployeeController.router());
    router.use('/estimations', EstimationController.router());
    router.use('/consumptions', ConsumptionController.router())
    router.use('/plannings', PlanningController.router());
    router.use('/suppliers', SupplierController.router());

    // Handle 404
    router.use((req: Request, res: Response, next: NextFunction) => {
        if (!res.writableFinished)
            res.sendStatus(404);
        next();
    });

    return router;
}
