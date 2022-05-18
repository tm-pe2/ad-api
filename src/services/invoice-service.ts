import {execute} from "../utils/mysql.connector";
import {Invoice, InvoiceStatus} from "../classes/invoice";
import {invoiceQueries} from "../queries/invoice-queries";
import { setInterval } from "timers";
import { MailService } from "./mail-service";
import { mkdirSync } from "fs";
import Mail from "nodemailer/lib/mailer";

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

//this gives all the overdue invoices even if status id isn't InvoiceStatus.overdue
export const getOverdueInvoices = async () => {
    const query = `SELECT * FROM invoices WHERE "Statusid" =  $1;`;
    const invoicesSql = await execute<{rows: Invoice[]}>(query, [ InvoiceStatus.overdue])
    .catch(e => console.log("overdue invoices error: ", e));
    if(!invoicesSql)
    return undefined
    console.log(invoicesSql.rows.length)
    const overdues = await getOverdueInvoices()
    const ms = new MailService();
    overdues?.forEach(o => {
        ms.overdueInvoice(o)
    })
    return invoicesSql.rows;
};

//TODO use scheduler (invoice branch)
export async function setOverdue() {
    console.log("set overdue");
    
    const querySelect = `select * from "invoices" WHERE "Statusid" = ${InvoiceStatus.sent} AND "DueDate" <= '${new Date().toISOString()}'`;
    const queryUpdate = `UPDATE "invoices" SET "Statusid" = ${InvoiceStatus.overdue} WHERE "Statusid" = ${InvoiceStatus.sent} AND "DueDate" <= '${new Date().toISOString()}'`
    const invoices = await execute<{rows: Invoice[]}>(querySelect);
    execute<unknown>(queryUpdate).catch(e => console.log(e));
    const ms = new MailService();
    
    invoices.rows.forEach(o  => ms.overdueInvoice(o));
    //new 
}

export async function startIntervalsOverdue() {
    setInterval(setOverdue, 10000);
}
