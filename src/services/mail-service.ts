import { Logger } from '../utils/logger';
import { Transporter, createTransport, SentMessageInfo, } from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import * as mailConfig from '../configs/mailServiceConfig.json'
import { Customer } from '../models/customers';
import { Invoice } from '../classes/invoice';

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
        email: "AD0830686@PE2022.com"
    };
    
    constructor() {
        this.checkEnv()
        this.hostEmail = process.env.MAILSERVER_U + "@" + mailConfig.domain;
        this.from = `${mailConfig.company} info ${this.hostEmail}`;
        this.transport = this.createTrans();
        this.transport.on("error", (err) => Logger.error(err));
        //console.log(this.transport);
        this.verify()
    };
    
    
    
    private checkEnv() {
        if (!process.env.MAILSERVER_P)
        throw new Error("Please define MAILSERVER_U in your env file");
        
        if (!process.env.MAILSERVER_U)
            throw new Error("Please define MAILSERVER_P in your env file");
        }
        
        private createTrans() {
            //using https://ethereal.email includes authentication, testing
            //mailserver doesn't have authentication (no TLS)
            return createTransport({
                from: this.from,
                host: mailConfig.host,
                port: mailConfig.port,
                auth: {
                    user: this.hostEmail,
                    pass: process.env.MAILSERVER_P
                },
                //logger: true,
                //transactionLog: true,
                secure: false,
                requireTLS: false
            })
        }
        
        private async verify(): Promise<void> {
            if (!(await this.transport.verify()))
            throw new Error("transport in mailService isn't valid");
        }
        
        public sendInvoice(invoice: Invoice): SentMessageInfo {
            //TODO Get customer data from db
            const title = `Dear ${this.customer.firstName} ${this.customer.lastName}`;
            const body = [
                `your invoice ${invoice.invoice_id} of ${invoice.price} is due at ${invoice.due_date.toDateString()} Please pay this as soon as possible.`,
            "if you wish to see more details and/or pay please visit <a href='https://templates.office.com/en-us/Invoices'>this link</a>"
        ];
        
        return this.transport.sendMail({
            from: this.from,
            to: this.customer.email,
            subject: `Invoice: ${invoice.invoice_id}`,
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
            from: this.from,
            to: this.customer.email,
            subject: `Work order`,
            text: this.textFormat(title, body),
            html: this.htmlFormat(title, body),
        }).catch((e) => { Logger.error(e); });
    }
    
    public sendAppointment(/*appointment: Appointment*/): SentMessageInfo{
        const Customer = this.customer;
        //info from db
        const title = `Dear ${Customer.firstName} ${Customer.lastName}`;
        const body = [
            "there has been set an appointment",
            `your appointment has been set on ${new Date().toDateString()}.`
        ];
        
        return this.transport.sendMail({
            from: this.from,
            to: this.customer.email,
            subject: `Work order`,
            text: this.textFormat(title, body),
            html: this.htmlFormat(title, body),
        }).catch((e) => { Logger.error(e); });
    }

    overdueInvoice(o: Invoice) : SentMessageInfo{
        const Customer = this.customer;
        //info from db
        const title = `Dear ${Customer.firstName} ${Customer.lastName}`;
        const body = [
            `Your invoice ${o.invoice_id} is overdue`,
            `Please pay the invoice at <a href="./invoice">this link</a>.`,
            `<br>`,
            `Invoice: ${o.invoice_id}`,
            `date: ${o.creation_date}`,
            `price: ${o.price}`,
        ];
        
        console.log(o);
        
        return this.transport.sendMail({
            from: this.from,
            to: this.customer.email,
            subject: `Invoice: ${o.invoice_id}`,
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

