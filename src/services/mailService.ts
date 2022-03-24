import { Logger } from '../utils/logger';
import { Transporter, createTransport, SentMessageInfo, } from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import * as mailConfig from '../configs/mailServiceConfig.json'
import { Customer } from '../models/customers';

export class MailService {
    private transport: Transporter<SMTPTransport.SentMessageInfo>;
    private hostEmail: string;
    private from : string;
             
    private endMail = `Best regards,\n${mailConfig.company}`;
    //supposed to be gotten from the data base
    private customer: Customer = {
        id: 1,
        firstName: "maci",
        lastName: "rohan48",
        email: "marco.altenwerth95@ethereal.email"
    };

    constructor() {
        this.checkEnv()
        this.hostEmail = process.env.MAILSERVICE_USER + "@" + mailConfig.domain;
        this.from = `${mailConfig.company} ${this.hostEmail}`;
        this.transport = this.createTrans();
        this.transport.on("error", (err) => Logger.error(err));
        //console.log(this.transport);
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
            from: this.from,
            host: mailConfig.host,
            port: mailConfig.port,
            auth: {
                user: this.hostEmail,
                pass: process.env.MAILSERVICE_PASS
            },
            //logger: true,
            //transactionLog: true,
            secure: false,
            requireTLS: true
        })
    }

    private async verify(): Promise<void> {
        if (!(await this.transport.verify()))
            throw new Error("transport in mailService isn't valid");
    }

    public sendInvoice(/*customer: Customer | User */): SentMessageInfo {
        //info from db
        const invoice = {id: "I-0009", total: 1000.99, dueDate: new Date()}
        const title = `Dear ${this.customer.firstName} ${this.customer.lastName}`;
        const body = [
            `your invoice ${invoice.id} of ${invoice.total} is due at ${invoice.dueDate.toDateString()}. Please pay this as soon as possible.`,
            "if you wish to see more details and/or pay please visit <a href='https://templates.office.com/en-us/Invoices'>this link</a>"
        ];

        return this.transport.sendMail({
            to: this.customer.email,
            subject: `Invoice: ${invoice.id}`,
            text: this.textFormat(title, body),
            html: this.htmlFormat(title, body),
        }).catch((e) => { Logger.error(e); })
    }

    public sendWorkOrder(/*employee: Employee | User*/): SentMessageInfo{
        const employee = this.customer;
        //info from db
        const title = `Dear ${employee.firstName} ${employee.lastName}`;
        const body = [
            "you have a new work order.",
            "for more information go to <a href='https://templates.office.com/en-us/Invoices'>this link</a>"
        ];
        
        return this.transport.sendMail({
            to: this.customer.email,
            subject: `Work order`,
            text: this.textFormat(title, body),
            html: this.htmlFormat(title, body),
        }).catch((e) => { Logger.error(e); });
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

