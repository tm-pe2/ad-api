import { exec } from "child_process";
import { Router } from "express";
import { authSelf } from "../middleware/auth";
import { Invoice } from "../models/invoice";
import { invoiceQueries } from "../queries/invoice";
import { getAllInvoices } from "../services/invoice";
import { begin, execute } from "../utils/database-connector";

export class InvoiceController {
    static router(): Router {
        return Router({caseSensitive: false})
        .get('/', async (req, res, next) => {
            try{
                const invoices = await getAllInvoices()
                if(invoices)
                    res.send(invoices)
            } catch (e){
                res.status(503).json(e) //service not available
            }
        })

        .get('/self', authSelf, (req, res, next) => {
            
                /*const invoices = (await execute(invoiceQueries.getInvoiceByUserId, [token.id])).rows as Invoice[]
                if(invoices)
                    return res.status(200).send(invoices)
                else
                    res.status(502).json({error: "there was an error when trying to get invoices from user: " + token.id})
            
            )*/
        })
    }
}
