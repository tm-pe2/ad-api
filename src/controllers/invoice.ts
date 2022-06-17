import {Router} from "express";
import {authSelf} from "../middleware/auth";
import {InvoicesStatuses} from "../models/invoice";
import {getAllInvoices, getInvoicesByUserId, updateInvoiceStatus} from "../services/invoice";
import {begin, commit, connectClient, rollback} from "../utils/database-connector";
import {Logger} from "../utils/logger";
import * as pdfUtil from "../utils/invoice-to-pdf-util";
import { ValidateInterface } from "../classes/validate";

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
        .patch('/:id', async (req, res, next) => {
            const client = await begin();
            try {
                const invoiceId = Number(req.params.id);
                if (isNaN(invoiceId)) {
                    res.sendStatus(400);
                    return;
                }

                const status = req.body.status;
                // TODO validate
                await updateInvoiceStatus(client, invoiceId, status);

                commit(client);

                res.send("Status updated successfully");
            } catch (e){
                rollback(client);
                Logger.error(e);
                res.sendStatus(500);
            }
            client.release();
        })
    }
}
