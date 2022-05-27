import http from 'http';
import express, {Express} from 'express';
import {Request, Response, NextFunction} from 'express';
import morgan from 'morgan';
import * as DBConnector from './utils/mysql.connector';
import authRoutes from './routes/auth-routes';
import testRoutes from './routes/test-routes';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { Env } from './utils/env';
import {scheduleInvoiceJobs} from "./utils/schedule-jobs";
import { AddressController } from './controllers/address';
import { ConsumptionController } from './controllers/consumption';
import { MeterController } from './controllers/meter';
import { ContractController } from './controllers/contract';
import { CustomerController } from './controllers/customer';
import { EmployeeController } from './controllers/employee';
import { EstimationController } from './controllers/estimation';
import { InvoiceController } from './controllers/invoice';
import { PlanningController } from './controllers/planning';
import { SupplierController } from './controllers/supplier';
import { TariffController } from './controllers/tariff';
import { TicketController } from './controllers/ticket';
import { UserController } from './controllers/user';
import { AuthController } from './controllers/auth';


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
router.use('/auth', AuthController.router());
router.use('/test', testRoutes)

router.use('/addresses', AddressController.router())
router.use('/consumptions', ConsumptionController.router())
router.use('/meters', MeterController.router())
router.use('/contracts', ContractController.router())
router.use('/customers', CustomerController.router())
router.use('/employees', EmployeeController.router())
router.use('/estimations', EstimationController.router())
router.use('/invoices', InvoiceController.router())
router.use('/plannings', PlanningController.router())
router.use('/suppliers', SupplierController.router())
router.use('/tariffs', TariffController.router())
router.use('/tickets', TicketController.router())
router.use('/users', UserController.router())

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
