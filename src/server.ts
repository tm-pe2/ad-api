/** source/server.ts */
import http from 'http';
import express, {Express} from 'express';
import {Request, Response, NextFunction} from 'express';
import morgan from 'morgan';
import customerRoutes from './routes/customerRoutes';
import invoiceRoutes from './routes/invoiceRoutes';
import contractRoutes from './routes/contractRoutes';
import addressroutes from './routes/adressRoutes';
import employeeRoutes from './routes/employeeRoutes';

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
router.use('/api/', customerRoutes, invoiceRoutes, contractRoutes, addressroutes, employeeRoutes);

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
