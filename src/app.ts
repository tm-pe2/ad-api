import dotenv from 'dotenv';
import { httpServer } from './server'
import { MailService } from './services/mailService'

if (process.env.NODE_ENV == null || process.env.NODE_ENV === 'develepmont') {
  dotenv.config();
}

(async () => {
  console.log("run");

  const PORT: any = process.env.PORT ?? 6060;
  httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
  /*try{
  const ms = new MailService();
  ms.testEmail()
  } catch(e){
    console.error(e);
  }*/
})();
