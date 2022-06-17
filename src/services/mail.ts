import { Logger } from '../utils/logger';
import { Transporter, createTransport, SentMessageInfo, } from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { getUserById } from './user';
import { begin } from '../utils/database-connector';
import * as mailConfig from '../configs/mailServiceConfig.json'
import { InvoiceOverdue } from '../models/invoice';

export class MailService {
    private transport: Transporter<SMTPTransport.SentMessageInfo>;
    private hostEmail: string;
    private from: string;

    private endMail = `Best regards,\n${mailConfig.company}`;

    constructor() {
        this.checkEnv()
        this.hostEmail = process.env.MAILSERVER_U + "@" + mailConfig.domain;
        this.from = `${mailConfig.company}: Info ${this.hostEmail}`;
        this.transport = this.createTrans();
        this.transport.on("error", (err) => Logger.error(err));
        this.verify()
    };

    private checkEnv() {
        if (!process.env.MAILSERVER_P)
            throw new Error("Please define MAILSERVER_U in your env file");

        if (!process.env.MAILSERVER_U)
            throw new Error("Please define MAILSERVER_P in your env file");
    }

    private createTrans() {
        return createTransport({
            from: this.from,
            host: mailConfig.host,
            port: mailConfig.port,
            auth: {
                user: this.hostEmail,
                pass: process.env.MAILSERVER_P
            },
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
            `For more details click <a href='${mailConfig.baseLink}/manageinvoices'>this link</a>.`
        ];

        return this.transport.sendMail({
            from: this.from,
            to: user.email,
            subject: `New invoices`,
            text: this.textFormat(title, body),
            html: this.htmlFormat(title, body),
        }).catch(e => Logger.warn("sending mail failed: " + e))
    }
    async overdueInvoice(invoiceInfo: InvoiceOverdue): Promise<SentMessageInfo> {
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

};

