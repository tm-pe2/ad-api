/** source/server.ts */
import http from 'http';
import express, { Express } from 'express';
import { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import routesClients from './routes/clients';

const router: Express = express();

/** Logging */
router.use(morgan('dev'));
/** Parse the request */
router.use(express.urlencoded({ extended: false }));
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

/** Routes */
router.use('/', routesClients);

/** Error handling */
router.use((req: Request, res: Response, next: NextFunction) => 
{
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

/** Server */
const httpServer = http.createServer(router);
const PORT: any = process.env.PORT ?? 6060;
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));

/* Reference : https://www.section.io/engineering-education/how-to-create-a-simple-rest-api-using-typescript-and-nodejs/ 
   To build the basics of the API I have followed the tutorial provided in the reference. 
*/


export = router;