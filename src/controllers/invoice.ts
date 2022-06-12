import { exec } from "child_process";
import { Router } from "express";
import { send } from "process";
import { authSelf } from "../middleware/auth";
import { Invoice } from "../models/invoice";
import { invoiceQueries } from "../queries/invoice";
import { getAllInvoices, getInvoicesByUserId } from "../services/invoice";
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
            try {
                const invoices = getInvoicesByUserId(req.body.tokenData.id)
                res.status(200).send(invoices)
            } catch (e){
                res.status(502).json(e)
            }
        })
    }
}
