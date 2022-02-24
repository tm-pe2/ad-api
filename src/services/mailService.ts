import nodemailer from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import * as mailConfig from '../../mailServiceConfig.json'

export class MailService {
  private transport: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;
  private hostEmail: string;
  //using mailtrap.io -> mail development enviroment
  constructor() {
    this.hostEmail = mailConfig.host + "@" + mailConfig.domain;
    const transportConfig :SMTPTransport.Options = {
      host: process.env.MAILSERVER_HOST,
      port: mailConfig.port,
      secure: mailConfig.SSL,
      logger: true,
      requireTLS: mailConfig.TSL,
      auth: {
        type: "LOGIN",
        password: "beep",
        user: this.hostEmail,
      }
    };
    if (process.env.MAILTRAP_U && process.env.MAILTRAP_P) {
      transportConfig.auth = { 
        user: process.env.MAILTRAP_U,
        pass: process.env.MAILTRAP_P
      };
      //throw new Error("please define MAILTRAP_U and MAILTRAP_P in your .env file")
    }
    //TODO fix secure connection
    //set the port to use SSL or TLS -> put in certificate -> generate certificate
    this.transport = nodemailer.createTransport(transportConfig);
    this.verify();
  };

  private async verify(): Promise<void> {
    if (!(await this.transport?.verify()))
      throw new Error("transport in mailService isn't valid");
  }

  public testEmail() {
    //supposed to be gotten from the data base
    const userEmail = "test2@testMail"
  

    this.transport.sendMail({
      from: this.hostEmail,
      to: userEmail,
      text: "test",
      subject: "test"
    }).catch((e)=> console.error(e))
  }


};
