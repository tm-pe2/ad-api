import {execute} from "../utils/mysql.connector";
import {Invoice} from "../classes/invoice";
import {invoiceQueries} from "../queries/invoice-queries";

export const getAllInvoices = async () => {
    let invoices = execute<{rows: Invoice[]}>(invoiceQueries.getAllInvoices, []);
    console.log(invoices);
    return (await invoices).rows;
};

export const getInvoiceById = async (id: Invoice['invoice_id']) => {
    let invoice = execute<{rows: Invoice}>(invoiceQueries.getInvoiceById, [id]);
    console.log(invoice);
    return (await invoice).rows;
};

export const insertInvoice = async (invoice: Invoice) => {
    const result = await execute<{ rowCount: number }>(invoiceQueries.addInvoice, [
        invoice
    ]);
    return result.rowCount > 0;
};

export const updateInvoice = async (invoice: Invoice) => {
    const result = await execute<{ rowCount: number }>(invoiceQueries.updateInvoice, [
        invoice.customer_id,
        invoice.supplier_id,
        invoice.creation_date,
        invoice.due_date,
        invoice.status_id,
        invoice.gas_amount,
        invoice.electricity_type,
        invoice.price,
        invoice.tax,
        invoice.start_date,
        invoice.end_date,
        invoice.invoice_id
    ]);
    return result.rowCount > 0;
};

export const deleteInvoiceById = async (id: Invoice['invoice_id']) => {
    const result = await execute<{ rowCount: number }>(invoiceQueries.deleteInvoiceById, [id]);
    return result.rowCount > 0;
};
