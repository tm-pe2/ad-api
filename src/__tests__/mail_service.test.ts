import { SentMessageInfo } from "nodemailer";
import { MailService } from "../services/mailService";
import dotenv from 'dotenv';

dotenv.config()

describe("sents invoice mails", () => {
    it("should respond defined", async ()=> {
        const ms = new MailService();
        const res = await ms.sendInvoice();
        expect(res.response).toEqual(expect.stringContaining(`250 Accepted`));
    })
})

describe("sents workorder", ()=> {
    it("should respond defined",async () => {
        const ms = new MailService();
        const res = await ms.sendWorkOrder();
        expect(res.response).toEqual(expect.stringContaining(`250 Accepted`));
    })
} )