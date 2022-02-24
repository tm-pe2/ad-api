import { logging } from 'googleapis/build/src/apis/logging';
import {TestAccount, Transporter, createTestAccount, createTransport,} from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import * as mailConfig from '../../mailServiceConfig.json'

export class MailService {
  private account: TestAccount | undefined;
  private transport: Transporter<SMTPTransport.SentMessageInfo> | undefined;
  //private hostEmail: string;
  //using mailtrap.io -> mail development enviroment
  constructor() { 
    this.acc();
    this.transport = this.createTrans();
    
    this.verify();
  };

  private async acc() {
    const acc = await createTestAccount();
    if(!acc)
    {
      throw new Error("couldn't create test account");
    }
  }

  private async createTrans() {
    return
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
    if (!(await this.transport?.verify()))
      throw new Error("transport in mailService isn't valid");
  }

  public testEmail() {
    //supposed to be gotten from the data base
    const userEmail = "test2@testMail"
  

    this.transport.sendMail({
      //from: this.hostEmail,
      to: userEmail,
      text: "test",
      subject: "test"
    }).catch((e)=> console.error(e))
  }


};

