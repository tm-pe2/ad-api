import { SentMessageInfo } from "nodemailer";
import { MailService } from "../services/mail-service";
import dotenv from 'dotenv';

dotenv.config()

describe("sents invoice mails", () => {
    it("should respond 250 ...", async () => {
        const ms = new MailService();
        const res = await ms.sendInvoice({
            InvoiceID: 1,
            CustomerID: 1,
            DueDate: new Date(),
            SupplierID: 1,
            Date: new Date(),
            Status: 0,
            GasAmount: 0,
            ElectricityType: 0,
            Price: 0,
            Tax: 0,
            StartDate: new Date(),
            EndDate: new Date()
        });
        expect(res.response).toEqual(expect.stringContaining(`250`));
        expect(res.rejected.length).toEqual(0);
    })
})

describe("sents workorder", () => {
    it("should respond 250 ...", async () => {
        const ms = new MailService();
        const res = await ms.sendWorkOrder();
        expect(res.response).toEqual(expect.stringContaining(`250`));
        expect(res.rejected.length).toEqual(0);
    })
})
