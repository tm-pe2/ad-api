import {Request, RequestHandler, Response} from 'express';
import {Invoice, invoiceSchema} from '../classes/invoice';
import * as invoiceService from '../services/invoice-service';
import * as pdfUtil from "../utils/invoice-to-pdf-util";

export const getAllInvoices: RequestHandler = async (req: Request, res: Response) => {
    try {
        const invoices = await invoiceService.getAllInvoices();

        res.status(200).json({
            invoices
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when fetching invoices'
        });
    }
};

export const getInvoiceById: RequestHandler = async (req: Request, res: Response) => {
    try {
        const invoice = await invoiceService.getInvoiceById(Number(req.params.id));

        res.status(200).json({
            invoice
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when fetching invoice'
        });
    }
};

export const addInvoice: RequestHandler = async (req: Request, res: Response) => {
    try {
        //validate the request body
        const addInvoiceSchema = invoiceSchema.fork('invoice_id', field => field.optional());
        let invoice: Invoice = await addInvoiceSchema.validateAsync(req.body);

        // insert invoice
        if(await invoiceService.insertInvoice(invoice)){
            res.status(200).json({
                message: "Invoice inserted succesfully!"
            });
        }
        else{
            res.status(401).json({
                message: "An error occured!"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when adding new invoice'
        });
    }
};

export const updateInvoice: RequestHandler = async (req: Request, res: Response) => {
    try {
        //validate the request body
        let invoice: Invoice = await invoiceSchema.validateAsync(req.body);

        if(await invoiceService.updateInvoice(invoice)){
            res.status(200).json({
                message: "Invoice updated succesfully!"
            });
        }
        else{
            res.status(401).json({
                message: "An error occured!"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when updating invoice'
        });
    }
};

export const deleteInvoiceById: RequestHandler = async (req: Request, res: Response) => {
    try {
        if(await invoiceService.deleteInvoiceById(Number(req.params.id))){
            res.status(200).json({
                message: "Invoice deleted succesfully!"
            });
        }
        else{
            res.status(401).json({
                message: "An error occured!"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when deleting invoice'
        });
    }
};

export const getInvoicePdfById: RequestHandler = async (req: Request, res: Response) => {
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
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when fetching pdf of invoice'
        });
    }
};

export const getInvoiceByUserId: RequestHandler = async (req: Request, res: Response) => {
    try {
        const invoice = await invoiceService.getInvoiceByUserId(Number(req.params.id));

        res.status(200).json({
            invoice
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when fetching invoices'
        });
    }
}
