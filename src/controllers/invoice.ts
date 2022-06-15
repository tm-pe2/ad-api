import { exec } from "child_process";
import { Router } from "express";
import { send } from "process";
import { authSelf } from "../middleware/auth";
import { Invoice } from "../models/invoice";
import { invoiceQueries } from "../queries/invoice";
import { getAllInvoices, getInvoicesByUserId } from "../services/invoice";
import { begin, connectClient, execute } from "../utils/database-connector";
import { Logger } from "../utils/logger";

export class InvoiceController {
    static router(): Router {
        return Router({caseSensitive: false})
        .get('/', async (req, res, next) => {
            const client = await connectClient();
            try{
                const invoices = await getAllInvoices(client);
                res.send(invoices);
                
            } catch (e){
                Logger.error(e);
                res.sendStatus(500);
            }
            client.release();
        })

        .get('/self', authSelf(), async (req, res, next) => {
            const client = await connectClient();
            try {
                const invoices = await getInvoicesByUserId(client, req.body.tokenData.id)
                res.send(invoices)
            } catch (e){
                Logger.error(e);
                res.sendStatus(500);
            }
            client.release();
        })
    }
}
