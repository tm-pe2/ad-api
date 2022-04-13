import {NextFunction, Request, RequestHandler, Response} from 'express';
import {Invoice} from '../classes/invoice';
import * as invoiceService from '../services/invoice-service';

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
        let obj = req.body
        let invoice: Invoice = new Invoice(null, obj.customerId, obj.supplierId, obj.date, obj.dueDate, obj.status, obj.gasAmount, obj.electricityType, obj.price, obj.tax, obj.startDate, obj.endDate);

        const result = await invoiceService.insertInvoice(invoice);

        res.status(200).json({
            result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when adding new invoice'
        });
    }
};

export const updateInvoice: RequestHandler = async (req: Request, res: Response) => {
    try {
        let obj = req.body
        let invoice: Invoice = new Invoice(obj.invoiceId, obj.customerId, obj.supplierId, obj.date, obj.dueDate, obj.status, obj.gasAmount, obj.electricityType, obj.price, obj.tax, obj.startDate, obj.endDate)

        const result = await invoiceService.updateInvoice(invoice);

        res.status(200).json({
            result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when updating invoice'
        });
    }
};

export const deleteInvoiceById: RequestHandler = async (req: Request, res: Response) => {
    try {
        const result = await invoiceService.deleteInvoiceById(Number(req.params.id));

        res.status(200).json({
            result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when deleting invoice'
        });
    }
};
