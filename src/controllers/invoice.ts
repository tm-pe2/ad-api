import { Router } from "express";
import { Invoice } from "../models/invoice";
import { invoiceQueries } from "../queries/invoice-queries";
import { execute } from "../utils/database-connector";

export class InvoiceController {
    static router(): Router {
        return Router({caseSensitive: false})
        .get('/', async (req, res, next) => {
            try{
            const invoices = await this.getInvoices()
            res.send(invoices)
            } catch (e){
                res.sendStatus(503) //service not available
            }
        })

        .get('/self', (req, res, next) => {
            //get id from login
        })
    }

    static async getInvoices(): Promise<Invoice[]> {
        return (await execute(invoiceQueries.getAllInvoices)).rows as Invoice[];
    }
}
