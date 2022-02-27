import { Logger } from '../utils/logger';
import { Transporter, createTransport, } from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import * as mailConfig from '../../mailServiceConfig.json'

export class MailService {
  //private account: TestAccount | undefined;
  private transport: Transporter<SMTPTransport.SentMessageInfo>;
  private hostEmail: string;
  //using mailtrap.io -> mail development enviroment
  constructor() {
    //having uncertain member variables is bad practice
    // use the create transport or use the env file
    this.checkEnv()
    this.hostEmail = process.env.MAILSERVICE_USER + "@" + mailConfig.domain;
    this.transport = this.createTrans();
    this.verify()
  };

  private checkEnv() {
    if (!process.env.MAILSERVICE_USER)
      throw new Error("Please define MAILSERVICE_USER in your env file");

    if (!process.env.MAILSERVICE_PASS)
      throw new Error("Please define MAILSERVICE_PASS in your env file");
  }

  private createTrans() {
    return createTransport({
      host: mailConfig.host,
      port: mailConfig.port,
      auth: {
        user: this.hostEmail,
        pass: process.env.MAILSERVICE_PASS
      },
      logger: false,
      secure: false,
      requireTLS: true
    })


    //env check
    /*if(!process.env.MAILSERVICE_USER || !process.env.MAILSERVICE_PASS)
      throw new Error("please define MAILSERVICE_USER and/or MAILSERVICE_PASS");
    */

    //this.hostEmail = process.env.MAILSERVICE_USER + "@" + mailConfig.domain;
    //using https://ethereal.email includes authentication
    /*this.transport = nodemailer.createTransport({
      host: mailConfig.host,
      port: mailConfig.port,
      secure: mailConfig.secure,
      requireTLS: mailConfig.secure,
      auth: {
          user: this.hostEmail,
          pass: process.env.MAILSERVICE_PASS
      },
      logger: true
  });*/
  }

  private async verify(): Promise<void> {
    if (!(await this.transport.verify()))
      throw new Error("transport in mailService isn't valid");
  }

  public testEmail() {
    //supposed to be gotten from the data base
    const userEmail = "maci.rohan48@ethereal.email"
    
    this.transport.sendMail({
      from: this.hostEmail,
      to: userEmail,
      text: "test",
      subject: "test"
    }).catch((e) => {Logger.info(e);})
  }


};

