import dotenv from 'dotenv';
import express, {Express} from 'express';
import * as DBConnector from './utils/database-connector';
import { Env } from './utils/env';
import { Logger } from './utils/logger';
import { setRoutes } from './routes';
import { createServer, Server } from 'http';
import settings from './configs/settings.json';
import { scheduleInvoiceJobs } from './utils/schedule-jobs';

if (process.env.NODE_ENV == null || process.env.NODE_ENV === 'development') {
    dotenv.config();
}

try {
    Env.validateMandatoryKeys();
} catch (err) {
    Logger.error('.env not properly configured: ', err);
    process.exit(-1);
}

(async () => {
    const app = setRoutes(express())
    const server = createServer(app);

    server.listen(process.env.PORT || settings.port, () => {
        Logger.info(`The server is running on port ${process.env.PORT || settings.port}`);
    });
    
    DBConnector.init();
    
    process.on('SIGINT', () => {onClose(server)});
    process.on('SIGTERM', () => {onClose(server)});
    
      
    // scheduleInvoiceJobs();
})();

function onClose(http: Server) {
    Logger.warn('Closing http server and database connection...');
    DBConnector.end();
    http.close((err) => {
        Logger.info('HTTP server closed.');
        process.exit(err ? 1 : 0);
    });
}
