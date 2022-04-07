import { NextFunction, Request, RequestHandler, Response } from 'express';
import { Invoice } from '../classes/invoice';
import * as InvoiceService from '../services/invoiceService';

export const getAllInvoices: RequestHandler = async (req: Request, res: Response) => {
    try {
        const invoices = await InvoiceService.getAllInvoices();

        res.status(200).json({
            invoices
        });
    } catch (error) {
        console.error('[invoiceController][getAllInvoices][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
        res.status(500).json({
            message: 'There was an error when fetching invoices'
        });
    }
};

export const getInvoiceById: RequestHandler = async (req: Request, res: Response) => {
    try {
        const invoice = await InvoiceService.getInvoiceById(Number(req.params.id));

        res.status(200).json({
            invoice
        });
    } catch (error) {
        console.error('[invoiceController][getInvoiceById][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
        res.status(500).json({
            message: 'There was an error when fetching invoice'
        });
    }
};

export const addInvoice: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let obj = req.body
        let invoice: Invoice = new Invoice(
            Number(obj.ClientID),
            Number(obj.SupplierID),
            obj.Date,
            obj.DueDate,
            obj.Type,
            Number(obj.Amount),
            Number(obj.Price),
            obj.Tax,
            Number(obj.Status)
        );
        const result = await InvoiceService.insertInvoice(invoice);

        res.status(200).json({
            result
        });
    } catch (error) {
        next(error);
        //console.error('[customerController][addCustomer][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
        res.status(500).json({
            message: 'There was an error when adding new invoice'
        });
    }
};

export const updateInvoice: RequestHandler = async (req: Request, res: Response) => {
    try {
        let obj = req.body
        let c: Invoice = new Invoice(
            Number(obj.ClientID),
            Number(obj.SupplierID),
            obj.Date,
            obj.DueDate,
            obj.Type,
            Number(obj.Amount),
            Number(obj.Price),
            obj.Tax,
            Number(obj.Status),
            obj.InvoiceID
        );// to run validations

        const result = await InvoiceService.updateInvoice(c);

        res.status(200).json({
            result
        });
    } catch (error) {
        console.error('[invoiceController][updateInvoice][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
        res.status(500).json({
            message: 'There was an error when updating invoice'
        });
    }
};

export const deleteInvoiceById: RequestHandler = async (req: Request, res: Response) => {
    try {
        const result = await InvoiceService.deleteInvoiceById(Number(req.params.id));

        res.status(200).json({
            result
        });
    } catch (error) {
        console.error('[invoiceController][deleteInvoiceById][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
        res.status(500).json({
            message: 'There was an error when deleting invoice'
        });
    }
};
