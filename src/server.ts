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
import * as DBConnector from './utils/mysql.connector';
import userRoutes from './routes/user-routes';
import authRoutes from './routes/auth-routes';
import testRoutes from './routes/test-routes';
import consumptionRoutes from './routes/consumption-routes';
import meterRoutes from './routes/meter-routes';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { Env } from './utils/env';
import { RefreshToken } from './classes/refreshtokens';
import {scheduleInvoiceJobs} from "./utils/schedule-jobs";

if (process.env.NODE_ENV == null || process.env.NODE_ENV === 'development') {
    dotenv.config();
}

const router: Express = express();

/** Middleware for CORS */
router.use(cors());

/** Logging */
router.use(morgan('dev'));
/** Parse the request */
router.use(express.urlencoded({extended: false}));
/** Takes care of JSON data */
router.use(express.json());

router.use(bodyParser.json());

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
DBConnector.init();


/** Routes */
router.use('/auth/', authRoutes)
router.use('/test/', testRoutes)

router.use('/addresses/', addressRoutes)
router.use('/consumptions/', consumptionRoutes)
router.use('/meters/', meterRoutes)
router.use('/contracts/', contractRoutes)
router.use('/customers/', customerRoutes)
router.use('/employees/', employeeRoutes)
router.use('/estimations/', estimationRoutes)
router.use('/invoices/', invoiceRoutes)
router.use('/plannings/', planningRoutes)
router.use('/suppliers/', supplierRoutes)
router.use('/tariffs/', tariffRoutes)
router.use('/tickets/', ticketRoutes)
router.use('/users/', userRoutes)

// RefreshToken.addRefreshToken(1, 'test').then(() => {
//     console.log('added refresh token');
//     RefreshToken.getRefreshToken(1).then((token) => {
//         console.log(token);
//         RefreshToken.deleteRefreshToken(token.userId).then(() => {
//             console.log('deleted refresh token');
//         })
//         .catch((err) => {
//             console.log(err);
//         }
//         );
//     })
//     .catch((err) => {
//         console.log(err);
//     });
// });
    

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

/** Schedule invoice jobs */
scheduleInvoiceJobs();
