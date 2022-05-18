import { execute } from "../utils/mysql.connector";
import { Invoice, InvoiceStatus } from "../classes/invoice";
import { invoiceQueries } from "../queries/invoice-queries";
import { setInterval } from "timers";
import { MailService } from "./mail-service";
import { Contract } from "../classes/contracts";
import { InvoicePdf } from "../classes/invoice-pdf";

export const getAllInvoices = async () => {
    return await execute<Invoice[]>(invoiceQueries.getAllInvoices, [], "rows");
};

export const getInvoiceById = async (id: Invoice['invoice_id']) => {
    const invoices = await execute<Invoice[]>(invoiceQueries.getInvoiceById, [id], "rows");
    return invoices[0];
};

export const getInvoiceByPeriod = async (id: Invoice['contract_id'], periodStart: Invoice['period_start'], periodEnd: Invoice['period_end']) => {
    const invoices = await execute<Invoice[]>(invoiceQueries.getInvoiceByPeriod, [periodStart, periodEnd], "rows");
    return invoices[0];
};

export const insertInvoice = async (invoice: Invoice) => {
    const rowCount = await execute<number>(invoiceQueries.addInvoice, [
        invoice.contract_id,
        invoice.supplier_id,
        invoice.creation_date,
        invoice.due_date,
        invoice.status_id,
        invoice.price,
        invoice.tax,
        invoice.period_start,
        invoice.period_end,
        invoice.tariff_rate
    ], "rowCount");

    return rowCount > 0;
};

export const updateInvoice = async (invoice: Invoice) => {
    const rowCount = await execute<number>(invoiceQueries.updateInvoice, [
        invoice.contract_id,
        invoice.supplier_id,
        invoice.creation_date,
        invoice.due_date,
        invoice.status_id,
        invoice.price,
        invoice.tax,
        invoice.period_start,
        invoice.period_end,
        invoice.tariff_rate,

        invoice.invoice_id
    ], "rowCount");

    return rowCount > 0;
};

export const deleteInvoiceById = async (id: Invoice['invoice_id']) => {
    const rowCount = await execute<number>(invoiceQueries.deleteInvoiceById, [id], "rowCount");

    return rowCount > 0;
};

export const getInvoiceByIdAndContractPeriod = async (contract: Contract) => {
    const rowCount = await execute<number>(invoiceQueries.getInvoiceByIdAndContractPeriod, [
        contract.contract_id,
        contract.start_date,
        contract.end_date,
    ], "rowCount");

    return rowCount > 0;
};

export const getInvoicePdfData = async (id: Invoice['invoice_id']) => {
    const result = await execute<InvoicePdf[]>(invoiceQueries.getInvoicePdfData, [id], "rows");

    return result[0];
}

export const getInvoiceByUserId = async (id: Invoice['invoice_id']) => {
    return await execute<Invoice[]>(invoiceQueries.getInvoiceByUserId, [id], "rows");
};

//this gives all the overdue invoices even if status id isn't InvoiceStatus.overdue
export const getOverdueInvoices = async () => {
    const query = `SELECT * FROM invoices WHERE "Statusid" =  $1;`;
    const invoicesSql = await execute<{ rows: Invoice[] }>(query, [InvoiceStatus.overdue])
        .catch(e => console.log("overdue invoices error: ", e));
    if (!invoicesSql)
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

    const querySelect = `select * from "invoices" WHERE "Statusid" = $1 AND "DueDate" <= $2`;
    const queryUpdate = `UPDATE "invoices" SET "Statusid" = $1 WHERE "Statusid" = $2 AND "DueDate" <= $3`
    const invoices = await execute<{ rows: Invoice[] }>(querySelect, [InvoiceStatus.sent, new Date().toISOString()]);
    execute<unknown>(queryUpdate, [InvoiceStatus.overdue,InvoiceStatus.sent, new Date().toISOString()]).catch(e => console.log(e));
    const ms = new MailService();

    invoices.rows.forEach(o => ms.overdueInvoice(o));
    //new 
}

export async function startIntervalsOverdue() {
    setInterval(setOverdue, 10000);
}
