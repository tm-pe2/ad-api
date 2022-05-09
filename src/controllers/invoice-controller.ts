import {Request, RequestHandler, Response} from 'express';
import {Invoice, invoiceSchema} from '../classes/invoice';
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

// export const addInvoice: RequestHandler = async (req: Request, res: Response) => {
//     try {
//         //validate the request body
//         const addInvoiceSchema = invoiceSchema.fork('invoice_id', field => field.optional());
//         let invoice: Invoice = await addInvoiceSchema.validateAsync(req.body);
//
//         const result = await invoiceService.(invoice);
//
//         res.status(200).json({
//             result
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             message: 'There was an error when adding new invoice'
//         });
//     }
// };

// export const updateInvoice: RequestHandler = async (req: Request, res: Response) => {
//     try {
//         //validate the request body
//         let invoice: Invoice = await invoiceSchema.validateAsync(req.body);
//         const result = await invoiceService.updateInvoice(invoice);
//
//         res.status(200).json({
//             result
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             message: 'There was an error when updating invoice'
//         });
//     }
// };

// export const deleteInvoiceById: RequestHandler = async (req: Request, res: Response) => {
//     try {
//         const result = await invoiceService.deleteInvoiceById(Number(req.params.id));
//
//         res.status(200).json({
//             result
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             message: 'There was an error when deleting invoice'
//         });
//     }
// };
