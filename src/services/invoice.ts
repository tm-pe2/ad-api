import { Invoice } from "../models/invoice";
import { invoiceQueries } from "../queries/invoice";
import { begin, execute } from "../utils/database-connector";


export async function getAllInvoices(): Promise<Invoice[]> {
    console.log("beep");
    
    const client = await begin();
    const invoices = await execute(client, invoiceQueries.getAllInvoices)
    if(invoices.rowCount === 0) 
        return []
    return invoices.rows  
}
export async function getInvoicesByUserId (id: number) {
    console.log("invoices");
    if(id == NaN) {
      throw new Error("user id is not a number");
    }
    const client = await begin();
    const invoices = await execute(client, invoiceQueries.getInvoicesByUserId, [id]);
    
    if(invoices.rowCount === 0) return [];

    return invoices.rows;
};
/*export const insertInvoice = async (invoice: Invoice) => {
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
*/
/*


/*
//this gives all the overdue invoices even if status id isn't InvoiceStatus.overdue
export const getOverdueInvoices = async () => {
    const query = `SELECT * FROM invoices WHERE "status_id" =  $1;`;
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
*/
/*
//TODO use scheduler (invoice branch)
export async function setOverdue() {
    const querySelect = `select * from "invoices" WHERE "status_id" = $1 AND "due_date" <= $2`;
    const queryUpdate = `UPDATE "invoices" SET "status_id" = $1 WHERE "status_id" = $2 AND "due_date" <= $3`
    const invoices = await execute<{ rows: Invoice[] }>(querySelect, [InvoiceStatus.sent, new Date().toISOString()]);
    execute<unknown>(queryUpdate, [InvoiceStatus.overdue,InvoiceStatus.sent, new Date().toISOString()]).catch(e => console.log(e));
    const ms = new MailService();

    invoices.rows.forEach(o => ms.overdueInvoice(o));
    //new 
}

export async function startIntervalsOverdue() {
    setInterval(setOverdue, 10000);
}
*/
