import dotenv from 'dotenv';
import { date } from 'joi';
import { Invoice } from './classes/invoice';
import { httpServer } from './server'
import { MailService } from './services/mail-service'
import { Env } from './utils/env';
import { Logger } from './utils/logger';

if (process.env.NODE_ENV == null || process.env.NODE_ENV === 'develepmont') {
  dotenv.config();
}

try {
    Env.validateMandatoryKeys();
} catch (err) {
    console.error('.env not properly configured: ', err);
    process.exit(-1);
}

(async () => {
    console.log("run");

    const PORT: any = process.env.PORT || 6060;
    httpServer.listen(PORT, () => Logger.info(`The server is running on port ${PORT}`));
    
});
