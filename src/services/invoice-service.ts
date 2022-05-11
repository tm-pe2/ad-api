import {execute} from "../utils/mysql.connector";
import {Invoice, InvoiceStatus} from "../classes/invoice";
import {invoiceQueries} from "../queries/invoice-queries";

export const getAllInvoices = async () => {
    let invoices = execute<{rows: Invoice[]}>(invoiceQueries.getAllInvoices, []);
    console.log(invoices);
    return (await invoices).rows;
};

export const getInvoiceById = async (id: Invoice['InvoiceID']) => {
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
        invoice.CustomerID,
        invoice.SupplierID,
        invoice.Date,
        invoice.DueDate,
        invoice.Statusid,
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

export const getOverdueInvoices = async () => {
    console.log("start");
    const invoicesSql = await execute<{rows: Invoice[]}>('SELECT * FROM invoices WHERE "DueDate" <= $1;', [new Date().toISOString()]).catch(e => console.log("catch", e));
    console.log("overdue: 2");
    if(!invoicesSql)
        return undefined
    console.log(invoicesSql);
    const invoices = invoicesSql.rows;
    console.log("overdue: 3");
    //this gives all the overdue invoices even if status id isn't InvoiceStatus.overdue
    invoices.forEach(e => e.Statusid = InvoiceStatus.overdue)
    return invoices;
};

