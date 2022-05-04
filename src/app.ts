import dotenv from 'dotenv';
import { httpServer } from './server'
import { MailService } from './services/mail-service'
import { Env } from './utils/env';

if (process.env.NODE_ENV == null || process.env.NODE_ENV === 'develepmont') {
    //console.log(process.env.JWTSECRET)
  dotenv.config();
}

try {
    Env.validateMandatoryKeys();
} catch (err) {
    console.error('.env not properly configured: ', err);
    process.exit(-1);
}

(async () => {
  //console.log("run");

  const PORT: any = process.env.PORT ?? 6060;
  httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
  /*try{
  const ms = new MailService();
  ms.testEmail()
  } catch(e){
    console.error(e);
  }*/
})();
