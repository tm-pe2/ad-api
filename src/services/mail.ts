import { Logger } from '../utils/logger';
import { Transporter, createTransport, SentMessageInfo, } from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { getUserById } from './user';
import { begin } from '../utils/database-connector';
import * as mailConfig from '../configs/mailServiceConfig.json'
import { invoiceOverdue } from './invoice';
import { override } from 'joi';

export class MailService {
    private transport: Transporter<SMTPTransport.SentMessageInfo>;
    private hostEmail: string;
    private from: string;

    private endMail = `Best regards,\n${mailConfig.company}`;
    //supposed to be gotten from the data base
    /*private customer: Customer = {
        id: 1,
        firstName: "maci",
        lastName: "rohan48",
        email: "AD0830686@PE2022.com"
    };*/

    constructor() {
        this.checkEnv()
        this.hostEmail = process.env.MAILSERVER_U + "@" + mailConfig.domain;
        this.from = `${mailConfig.company}: Info ${this.hostEmail}`;
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

    public async sendInvoice(id: number): Promise<SentMessageInfo> {
        const client = await begin()
        const user = await getUserById(client, id)
        if (!user) return;
        const title = `Dear ${user.first_name} ${user.last_name}`;
        const body = [//TODO make link config file link
            `you have new invoices added to your account.`,
            `For more details click <a href='${/*mailConfig.baseLink*/ "localhost:4200"}/manageinvoices'>this link</a>.`
        ];

        return this.transport.sendMail({
            from: this.from,
            to: user.email,
            subject: `New invoices`,
            text: this.textFormat(title, body),
            html: this.htmlFormat(title, body),
        }).catch(e => Logger.warn("sending mail failed: " + e))
    }
    async overdueInvoice(invoiceInfo: invoiceOverdue): Promise<SentMessageInfo> {
        const client = await begin();
        //info from db
        const title = `Dear ${invoiceInfo.user.first_name} ${invoiceInfo.user.last_name}`;
        const body = [
            `Your invoice ${invoiceInfo.id} is overdue`,
            `Please pay the invoice at <a href="${mailConfig.baseLink}/manageinvoices">this link</a>.`,
            `<br>`
        ];

        return this.transport.sendMail({
            from: this.from,
            to: invoiceInfo.user.email,
            subject: `Overdue invoice`,
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


    /*public sendWorkOrder(): SentMessageInfo{
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
    
    public sendAppointment(): SentMessageInfo{
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
*/


};

