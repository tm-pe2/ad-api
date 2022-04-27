import {execute} from "../utils/mysql.connector";
import {Invoice} from "../classes/invoice";
import {invoiceQueries} from "../queries/invoice-queries";

export const getAllInvoices = async () => {
    return execute<Invoice[]>(invoiceQueries.getAllInvoices, []);
};

export const getInvoiceById = async (id: Invoice['InvoiceID']) => {
    return execute<Invoice>(invoiceQueries.getInvoiceById, [id]);
};

export const insertInvoice = async (invoice: Invoice) => {
    const result = await execute<{ rowCount: number }>(invoiceQueries.addInvoice, [
        invoice
    ]);
    return result.rowCount > 0;
};

export const updateInvoice = async (invoice: Invoice) => {
    const result = await execute<{ rowCount: number }>(invoiceQueries.updateInvoice, [
        invoice.CustomerID,
        invoice.SupplierID,
        invoice.Date,
        invoice.DueDate,
        invoice.Status,
        invoice.GasAmount,
        invoice.ElectricityType,
        invoice.Price,
        invoice.Tax,
        invoice.StartDate,
        invoice.EndDate,
        invoice.InvoiceID
    ]);
    return result.rowCount > 0;
};

export const deleteInvoiceById = async (id: Invoice['InvoiceID']) => {
    const result = await execute<{ rowCount: number }>(invoiceQueries.deleteInvoiceById, [id]);
    return result.rowCount > 0;
};
