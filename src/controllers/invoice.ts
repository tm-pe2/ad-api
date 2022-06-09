import { exec } from "child_process";
import { Router } from "express";
import { Invoice } from "../models/invoice";
import { invoiceQueries } from "../queries/invoice";
import { begin, execute } from "../utils/database-connector";

export class InvoiceController {
    static router(): Router {
        return Router({caseSensitive: false})
        .get('/', async (req, res, next) => {
            try{
            const client = await begin()
            const invoices = await execute(client, invoiceQueries.getAllInvoices)
            res.send(invoices)
            } catch (e){
                res.sendStatus(503) //service not available
            }
        })

        /*.get('/self', (req, res, next) => {
            verifyToken(req).then(async (token) =>{
                const invoices = await (await execute(invoiceQueries.getInvoiceByUserId, [token.id])).rows as Invoice[]
                if(invoices)
                    return res.status(200).send(invoices)
                else
                    res.status(502).json({error: "there was an error when trying to get invoices from user: " + token.id})
            }
            )
        })*/
    }
}
