import http from 'http';
import express, {Express} from 'express';
import {Request, Response, NextFunction} from 'express';
import morgan from 'morgan';
import customerRoutes from './routes/customer-routes';
import invoiceRoutes from './routes/invoice-routes';
import contractRoutes from './routes/contract-routes';
import addressRoutes from './routes/address-routes';
import employeeRoutes from './routes/employee-routes';
import estimationRoutes from './routes/estimation-routes';
import planningRoutes from './routes/planning-routes';
import tariffRoutes from './routes/tariff-routes';
import supplierRoutes from './routes/supplier-routes';
import ticketRoutes from './routes/ticket-routes';

import * as MySQLConnector from './utils/mysql.connector';


const router: Express = express();

/** Logging */
router.use(morgan('dev'));
/** Parse the request */
router.use(express.urlencoded({extended: false}));
/** Takes care of JSON data */
router.use(express.json());

/** RULES OF OUR API */
router.use((req: Request, res: Response, next: NextFunction) => {
    // set the CORS policy
    res.header('Access-Control-Allow-Origin', '*');
    // set the CORS headers
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    // set the CORS method headers
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
        return res.status(200).json({});
    }
    next();
});

// create database pool
MySQLConnector.init();


/** Routes */
router.use('/api/',
    customerRoutes,
    invoiceRoutes,
    contractRoutes,
    addressRoutes,
    employeeRoutes,
    estimationRoutes,
    planningRoutes,
    tariffRoutes,
    supplierRoutes,
    ticketRoutes
);

/** Error handling */
router.use((req: Request, res: Response, next: NextFunction) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

/** Server */
export const httpServer = http.createServer(router);
export default router;
