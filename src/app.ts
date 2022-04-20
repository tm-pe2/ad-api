import dotenv from 'dotenv';
import { Invoice } from './classes/invoice';
import { httpServer } from './server'
import { MailService } from './services/mailService'
import { Logger } from './utils/logger';


if (process.env.NODE_ENV == null || process.env.NODE_ENV === 'develepmont') {
    dotenv.config();
}

(async () => {
    console.log("run");

    const PORT: any = process.env.PORT || 6060;
    httpServer.listen(PORT, () => Logger.info(`The server is running on port ${PORT}`));
    try {
        const ms = new MailService();
       console.log(await ms.sendInvoice(new Invoice(1,1,new Date,new Date,"gas", 50 )));
        ms.sendWorkOrder();
    } catch (e) {
        console.error(e);
    }
})();
