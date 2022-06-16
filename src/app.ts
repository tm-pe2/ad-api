import dotenv from 'dotenv';
import express from 'express';
import * as DBConnector from './utils/database-connector';
import {Env} from './utils/env';
import {Logger} from './utils/logger';
import {setRoutes} from './routes';
import {createServer, Server} from 'http';
import settings from './configs/settings.json';
import {invoiceQueries} from './queries/invoice';
import {generateInvoices} from "./utils/generate-invoice-util";
import {INVOICE_TYPE} from "./models/invoice";

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
    // await generateInvoices(INVOICE_TYPE.DEBIT);
    // await generateInvoices(INVOICE_TYPE.ADVANCE);
})();

function onClose(http: Server) {
    Logger.warn('Closing http server and database connection...');
    DBConnector.end();
    http.close((err) => {
        Logger.info('HTTP server closed.');
        process.exit(err ? 1 : 0);
    });
}
