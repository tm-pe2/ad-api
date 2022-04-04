/** source/server.ts */
import http from 'http';
import express, { Express } from 'express';
import morgan from 'morgan';
// import routesClients from './routes/clients';
import routesAuth from './routes/auth';
import routesTest from './routes/test';
import bodyParser from 'body-parser';

import cors from 'cors'

import dotenv from 'dotenv';
import { Env } from './util/env';

if (process.env.NODE_ENV == null || process.env.NODE_ENV === 'development') {
    dotenv.config();
}

try {
    Env.validateMandatoryKeys();
} catch (err) {
    console.error('.env not properly configured: ', err);
    process.exit(-1);
}


const router: Express = express();

/** Middleware for CORS */
router.use(cors());

/** Logging */
router.use(morgan('dev'));
/** Parse the request */
router.use(express.urlencoded({ extended: false }));
/** Takes care of JSON data */
router.use(express.json());

router.use(bodyParser.json());

/** RULES OF OUR API */
router.use((req, res, next) => {
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

/** Routes */
// router.use('/', routesClients);
router.use('/auth/', routesAuth);
router.use('/', routesTest);

/** Error handling */
router.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

export const httpServer: http.Server = http.createServer(router);
export default router;



/* Reference : https://www.section.io/engineering-education/how-to-create-a-simple-rest-api-using-typescript-and-nodejs/ 
   To build the basics of the API I have followed the tutorial provided in the reference. 
*/
