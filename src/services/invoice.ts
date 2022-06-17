import { PoolClient } from "pg";
import { Invoice, INVOICE_STATUS, InvoicesStatuses } from "../models/invoice";
import { invoiceQueries } from "../queries/invoice";
import { begin, execute } from "../utils/database-connector";
import { Contract } from "../models/contract";
import { MailService } from "./mail";
import { User } from "../models/user";


export async function getAllInvoices(client: PoolClient): Promise<Invoice[]> {
    const invoices = await execute(client, invoiceQueries.getAllInvoices)
    if (invoices.rowCount === 0) return [];
    return invoices.rows
}
export async function getInvoicesByUserId(client: PoolClient, id: number) {
    const invoices = await execute(client, invoiceQueries.getInvoicesByUserId, [id]);
    if (invoices.rowCount === 0) return [];
    return invoices.rows;
}

export async function insertInvoice(client: PoolClient, invoice: Invoice): Promise<number | null> {
    const res = await execute(client, invoiceQueries.insertInvoice, [
        invoice.contract_id,
        invoice.supplier_id,
        invoice.type.valueOf(),
        invoice.creation_date,
        invoice.due_date,
        invoice.price,
        invoice.tax,
        invoice.period_start,
        invoice.period_end
    ]);

    if (res.rowCount === 0) return null;
    const invoiceId = res.rows[0].id;

    const intermediateRes = await execute(client, invoiceQueries.insertInvoiceStatus, [
        invoiceId, INVOICE_STATUS.DUE
    ]);
    if (intermediateRes.rowCount === 0) return null;

    return intermediateRes.rows[0].invoice_id;
}

export async function getInvoiceByContractIdAndPeriod(client: PoolClient, contract: Contract): Promise<Invoice | null> {
    const invoices = await execute(client, invoiceQueries.getInvoiceByContractIdAndPeriod, [contract.id, contract.start_date, contract.end_date]);
    if (invoices.rowCount === 0) return null;
    return invoices.rows[0] as Invoice;
}
// might or might not need this for something
export async function getInvoicesByContractIdAndPeriod(client: PoolClient, contract: Contract): Promise<Invoice[] | null> {
    const invoices = await execute(client, invoiceQueries.getInvoicesByContractIdAndBetweenPeriod, [contract.id, contract.start_date, contract.end_date]);
    if (invoices.rowCount === 0) return null;
    return invoices.rows as Invoice[];
}

export async function updateInvoiceStatus(client: PoolClient, invoiceId: number, invoiceStatus: INVOICE_STATUS): Promise<boolean> {
    const res = await execute(client, invoiceQueries.updateInvoiceStatus, [
        invoiceId,
        invoiceStatus
    ]);
    return res.rowCount !== 0;
}

export async function getInvoiceById(client: PoolClient, invoiceId: number) {
    const res = await execute(client, invoiceQueries.getInvoiceById, [invoiceId]);
    if (res.rowCount === 0) return null;
    return res.rows[0] as Invoice;
}


//this gives all the overdue invoices even if status id isn't InvoiceStatus.overdue
export const getOverdueInvoices = async () => {
    const client = await begin()
    const query = `SELECT * FROM invoices WHERE "status_id" =  $1;`;
    const invoicesSql = await execute(client, query, [INVOICE_STATUS.LATE])
        .catch(e => console.log("overdue invoices error: ", e));
    if (!invoicesSql)
        return undefined
    console.log(invoicesSql.rows.length)
    const overdues = await getOverdueInvoices()
    /*const ms = new MailService();
    overdues?.forEach(o => {
        ms.overdueInvoice(o)
    })*/
    return invoicesSql.rows;
};


//TODO use scheduler (invoice branch)
export async function setOverdue() {
    const client = await begin();

    //console.log(invoiceQueries.getLateNotReminded);
    const sql = await execute(client, invoiceQueries.getLateNotReminded, [
        INVOICE_STATUS.DUE,
        INVOICE_STATUS.LATE,
        new Date().toISOString()]);
    if (sql.rowCount === 0) return;

    const invoices = sql.rows as invoiceOverdue[];

    //console.log(invoices);

    const ms = new MailService();
    const date = new Date().toISOString();
    invoices.forEach(o => {
        ms.overdueInvoice(o).then(() => {
            updateInvoiceStatus(client, o.id, INVOICE_STATUS.REMINDED);
        }
        ).catch(() => {
            updateInvoiceStatus(client, o.id, INVOICE_STATUS.LATE);
        })

        //ms.overdueInvoice(o)
    });
    //new 
}

export interface invoiceOverdue extends Invoice {
    user: User

}
/*export async function startIntervalsOverdue() {
    setInterval(setOverdue, 10000);
}*/

