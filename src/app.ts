import dotenv from 'dotenv';
import { date } from 'joi';
import { Invoice } from './classes/invoice';
import { httpServer } from './server'
import { MailService } from './services/mail-service'
import { Env } from './utils/env';
import { Logger } from './utils/logger';

if (process.env.NODE_ENV == null || process.env.NODE_ENV === 'develepmont') {
    console.log(process.env.JWTSECRET)
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
    try {
        const ms = new MailService();
       console.log(await ms.sendInvoice({
    InvoiceID: 1, CustomerID: 1, 
    DueDate: new Date(), 
    SupplierID: 1,
    Date: new Date(),
    Status: 0,
    GasAmount: 0,
    ElectricityType: 0,
    Price: 0,
    Tax: 0,
    StartDate: new Date(),
    EndDate: new Date()
}));
        ms.sendWorkOrder();
    } catch (e) {
        console.error(e);
    }
})();
