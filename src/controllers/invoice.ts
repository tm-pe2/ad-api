import { Router } from "express";
import { Invoice } from "../models/invoice";
import { invoiceQueries } from "../queries/invoice-queries";
import { execute } from "../utils/database-connector";

export class InvoiceController {
    static router(): Router {
        return Router({caseSensitive: false})
        .get('/', (req, res, next) => {
            res.send(this.getInvoices())
        })

        .get('/self', (req, res, next) => {
            
        })
    }

    static async getInvoices(): Promise<Invoice[]> {
        return (await execute(invoiceQueries.getAllInvoices)).rows as Invoice[];
    }
}
