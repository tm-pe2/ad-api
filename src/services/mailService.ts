import { Logger } from '../utils/logger';
import { Transporter, createTransport, } from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import * as mailConfig from '../../mailServiceConfig.json'
import { Customer } from '../models/customers';

export class MailService {
  private transport: Transporter<SMTPTransport.SentMessageInfo>;
  private hostEmail: string;
  private endMail = `Best regards, ${mailConfig.company}`
  
  constructor() {
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
    //using https://ethereal.email includes authentication, testing
    return createTransport({
      host: mailConfig.host,
      port: mailConfig.port,
      auth: {
        user: this.hostEmail,
        pass: process.env.MAILSERVICE_PASS
      },
      logger: true,
      secure: false,
      requireTLS: true
    })
  }

  private async verify(): Promise<void> {
    if (!(await this.transport.verify()))
      throw new Error("transport in mailService isn't valid");
  }

  public sendInvoice() {
    //supposed to be gotten from the data base
    const customer : Customer = {id: 1,
    firstName: "maci", lastName: "rohan48", email: "maci.rohan48@ethereal.email"}
    const title = `Dear ${customer.firstName} ${customer.lastName}`;
    const body = ["this is a test", "a longer test message is what this is. maybe you can give me some juice."];

    
    this.transport.sendMail({
      from: this.hostEmail,
      to: customer.email,
      text: "test",
      subject: "test"
    }).catch((e) => {Logger.error(e);})
  }


};

