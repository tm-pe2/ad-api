import dotenv from 'dotenv';
import Express from 'express';
import { date } from 'joi';
import { MailService } from './services/mail-service'
import { Env } from './utils/env';
import { startIntervalsOverdue } from './services/invoice-service';
import { Logger } from './utils/logger';
import { setRoutes } from './routes';
import { createServer } from 'http';
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
    const app = setRoutes(Express())
    const server = createServer(app);

    server.listen(process.env.PORT || settings.port, () => {
        Logger.info(`The server is running on port ${process.env.PORT || settings.port}`);
    });

    scheduleInvoiceJobs();
})();
