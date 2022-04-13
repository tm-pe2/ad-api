import {execute} from "../utils/mysql.connector";
import {Invoice} from "../classes/invoice";
import {invoiceQueries} from "../queries/invoice-queries";

export const getAllInvoices = async () => {
    return execute<Invoice[]>(invoiceQueries.getAllInvoices, []);
};

export const getInvoiceById = async (id: Invoice['invoiceId']) => {
    return execute<Invoice>(invoiceQueries.getInvoiceById, [id]);
};

export const insertInvoice = async (invoice: Invoice) => {
    const result = await execute<{ affectedRows: number }>(invoiceQueries.addInvoice, [
        invoice.toJSON()
    ]);
    return result.affectedRows > 0;
};

export const updateInvoice = async (invoice: Invoice) => {
    const result = await execute<{ affectedRows: number }>(invoiceQueries.updateInvoice, [
        invoice.customerId,
        invoice.supplierId,
        invoice.date,
        invoice.dueDate,
        invoice.status,
        invoice.gasAmount,
        invoice.electricityType,
        invoice.price,
        invoice.tax,
        invoice.startDate,
        invoice.endDate,
        invoice.invoiceId
    ]);
    return result.affectedRows > 0;
};

export const deleteInvoiceById = async (id: Invoice['invoiceId']) => {
    const result = await execute<{ affectedRows: number }>(invoiceQueries.deleteInvoiceById, [id]);
    return result.affectedRows > 0;
};
