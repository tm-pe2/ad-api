/** source/controllers/clients.ts */
import { Request, Response, NextFunction } from 'express';
import { Invoice } from '../classes/invoice';

// get all invoices
const getInvoices = async (req: Request, res: Response, next: NextFunction) => {
    let invoice = new Invoice();
    return res.status(200).json(await invoice.readAll())
};

// get one client
const getInvoice = async (req: Request, res: Response, next: NextFunction) => {
    let invoice = new Invoice();
    return res.status(200).json(await invoice.readInvoice(Number(req.params.id)));
};

// update invoice
const updateInvoice = async (req: Request, res: Response, next: NextFunction) => {
    let invoice = new Invoice(Number(req.body.ClientID),Number(req.body.SupplierID),req.body.Date,req.body.DueDate,req.body.Type,Number(req.body.Amount),Number(req.body.Price),req.body.Tax,Number(req.body.Status),Number(req.body.InvoiceID));
    if(await invoice.update())
    {
        return res.status(200).json({"Status": "Invoice updated sucessfully!"})
    }
    else
    {
        return res.status(404).json({"Status" : "Something went wrong!"});
    }
};

// delete a Invoice
const deleteInvoice = async (req: Request, res: Response, next: NextFunction) => {
    let invoice = new Invoice();
    if(await invoice.delete(Number(req.params.id)))
    {
        return res.status(200).json({"Status": "Invoice deleted sucessfully!"})
    }
    else
    {
        return res.status(404).json({"Status" : "Something went wrong!"});
    }
};

// add a invoice
const addInvoice = async (req: Request, res: Response, next: NextFunction) => {
    let invoice = new Invoice(Number(req.body.ClientID),Number(req.body.SupplierID),req.body.Date,req.body.DueDate,req.body.Type,Number(req.body.Amount),Number(req.body.Price),req.body.Tax,Number(req.body.Status));
    if (await invoice.insert())
    {
        return res.status(200).json({"Status" : "Invoice inserted sucessfully!"});
    }
    else
    {
        return res.status(404).json({"Status" : "Invoice went wrong!"});
    }
};

export default { getInvoices, getInvoice, addInvoice, updateInvoice, deleteInvoice };