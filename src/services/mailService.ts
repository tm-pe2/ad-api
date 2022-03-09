import { Logger } from '../utils/logger';
import { Transporter, createTransport, } from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import * as mailConfig from '../configs/mailServiceConfig.json'
import { Customer } from '../models/customers';
import Mail from 'nodemailer/lib/mailer';

export class MailService {
    private transport: Transporter<SMTPTransport.SentMessageInfo>;
    private hostEmail: string;
    private endMail = `Best regards,\n${mailConfig.company}`;
    //supposed to be gotten from the data base
    private customer: Customer = {
        id: 1,
        firstName: "maci",
        lastName: "rohan48",
        email: "rafael.mertz34@ethereal.email"
    }

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
            from: { name: mailConfig.company, address: this.hostEmail } as Mail.Address,
            logger: true,
            secure: false,
            requireTLS: true
        })
    }

    private async verify(): Promise<void> {
        if (!(await this.transport.verify()))
            throw new Error("transport in mailService isn't valid");
    }

    public sendInvoice(/*customer: Customer | User */): void {
        //info from db
        const invoice = {id: "I-0009", total: 1000.99, dueDate: new Date()}
        const title = `Dear ${this.customer.firstName} ${this.customer.lastName}`;
        const body = [
            `your invoice ${invoice.id} of ${invoice.total} is due at ${invoice.dueDate.toDateString()}. Please pay this as soon as possible.`,
            "if you wish to see more details and/or pay please visit <a href='https://templates.office.com/en-us/Invoices'>this link</a>"
        ];

        this.transport.sendMail({
            to: this.customer.email,
            subject: "Invoice",
            text: this.textFormat(title, body),
            html: this.htmlFormat(title, body),
        }).catch((e) => { Logger.error(e); })
    }

    textFormat(title: string, body: string[]): string {
        let text = title;
        for (const b of body) {
            text += "\n\n" + b
        }
        text += "\n\n" + this.endMail;
        return text;
    }

    htmlFormat(title: string, body: string[]): string {
        let text = "<p>" + title + "</p>";
        for (const b of body) {
            text += "<p>" + b + "</p>";
        }

        text += "<p>" + this.endMail.replace("\n", "<br>") + "</p>";
        return text;
    }
};

