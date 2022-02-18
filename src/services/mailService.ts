import nodemailer from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export class MailService {
  private transport: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;
  //using mailtrap.io -> mail development enviroment
  constructor() {
    this.transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_U,
        pass: process.env.MAILTRAP_P
      }
    });
    this.verify()
  };

  private async verify(): Promise<void> {
    if (!(await this.transport?.verify()))
      throw new Error("transport in mailService isn't valid")
  }

  public testEmail() {
    this.transport.sendMail({
      from: "test@tester.com",
      to: "tester2@tester.com",
      text: "test",
      subject: "test"
    })
  }


};
