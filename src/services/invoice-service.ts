import {execute} from "../utils/mysql.connector";
import {Invoice, InvoiceStatus} from "../classes/invoice";
import {invoiceQueries} from "../queries/invoice-queries";
import { setInterval } from "timers";

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
    const query = 'SELECT * FROM invoices WHERE "Statusid" = $1;'
    const invoicesSql = await execute<{rows: Invoice[]}>(query, [InvoiceStatus.overdue]).catch(e => console.log("catch", e));

    console.log("overdue: 2");
    if(!invoicesSql)
        return undefined
    //this gives all the overdue invoices even if status id isn't InvoiceStatus.overdue
    console.log(invoicesSql.rows);
    
    return invoicesSql.rows;
};

export async function setOverdue() {
    const query = `UPDATE "invoices" SET "Statusid" = ${InvoiceStatus.overdue} WHERE "Statusid" = ${InvoiceStatus.sent} AND "DueDate" <= '${new Date().toISOString()}'` //AND  // "DueDate" <=  ${new Date().toISOString()
    const invoicesSql = await execute<unknown>(query);
}

export async function startIntervalsOverdue() {
    setInterval(setOverdue, 1000);
}
