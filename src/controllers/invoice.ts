import {Router} from "express";
import {authSelf} from "../middleware/auth";
import {InvoicesStatuses} from "../models/invoice";
import {getAllInvoices, getInvoicesByUserId, updateInvoiceStatus} from "../services/invoice";
import {connectClient} from "../utils/database-connector";
import {Logger} from "../utils/logger";
import * as pdfUtil from "../utils/invoice-to-pdf-util";

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

        .get('/:id/download', async (req, res, next) => {
            const client = await connectClient();
            try {
                const fs = require('fs');
                let file;

                const invoiceId = Number(req.params.id);

                if (!pdfUtil.fileExistsForInvoice(invoiceId))
                {
                    await pdfUtil.generatePdf(invoiceId);
                }

                file = pdfUtil.getPathToInvoiceFile(invoiceId);

                const stream = fs.createReadStream(file);
                const filename = encodeURIComponent("invoice" + invoiceId + ".pdf");

                res.setHeader('Content-disposition', 'inline; filename="' + filename + '"');
                res.setHeader('Content-type', 'application/pdf');

                stream.pipe(res);
            } catch (e){
                Logger.error(e);
                res.sendStatus(500);
            }
            client.release();
        })

        .post('/:id', async (req, res, next) => {
            const client = await connectClient();
            try {
                const invoicesStatuses: InvoicesStatuses = req.body;
                const invoiceId = await updateInvoiceStatus(client, invoicesStatuses);
                res.send(invoiceId);
            } catch (e){
                Logger.error(e);
                res.sendStatus(500);
            }
            client.release();
        })
    }
}
