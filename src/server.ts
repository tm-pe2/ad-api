/** src/server.ts */
import http from 'http';
import express, { Express } from 'express';
import morgan from 'morgan';
import routesPosts from './routes/posts';
import routesClients from './routes/clients';
import routesDashboard from './routes/dashboard';
import routesTicketing from './routes/ticketing';
import routesEnergyUsage from './routes/energyUsage';

const router: Express = express();

/** Logging */
router.use(morgan('dev'));
/** Parse the request */
router.use(express.urlencoded({ extended: false }));
/** Takes care of JSON data */
router.use(express.json());

/** RULES OF OUR API */
router.use((req, res, next) => {
    // set the CORS policy
    res.header('Access-Control-Allow-Origin', '*');
    // set the CORS headers
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    // set the CORS method headers
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
        return res.status(200).json({});
    }
    next();
});

/** Routes */
router.use('/', routesClients);
router.use('/', routesPosts);
router.use('/', routesDashboard);
router.use('/', routesTicketing);
router.use('/', routesEnergyUsage);

/** Error handling */
router.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

/** Server */
export const httpServer = http.createServer(router);
export default router;
