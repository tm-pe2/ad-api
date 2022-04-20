import dotenv from 'dotenv';
import { httpServer } from './server'
import { MailService } from './services/mailService'
import { Env } from './util/env';

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
  const PORT: any = process.env.PORT ?? 6060;
  httpServer.listen(PORT, () => console.log(`The server is running on http://localhost:${PORT}`));
  /*try{
  const ms = new MailService();
  ms.testEmail()
  } catch(e){
    console.error(e);
  }*/
})();
