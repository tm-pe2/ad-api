import { Router } from "express";
import { verifyToken } from "../middleware/auth";
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
            verifyToken(req).then(async (token) =>{
                const invoices = await (await execute(invoiceQueries.getInvoiceByUserId, [token.id])).rows as Invoice[]
                if(invoices)
                    return res.status(200).send(invoices)
                else
                    res.status(502).json({error: "there was an error when trying to get invoices from user: " + token.id})
            }
            )
        })
    }

    static async getInvoices(): Promise<Invoice[]> {
        return (await execute(invoiceQueries.getAllInvoices)).rows as Invoice[];
    }
}
