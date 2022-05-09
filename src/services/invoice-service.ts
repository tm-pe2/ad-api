import {execute} from "../utils/mysql.connector";
import {Invoice} from "../classes/invoice";
import {invoiceQueries} from "../queries/invoice-queries";
import {AdvanceInvoice, advanceInvoiceSchema} from "../classes/advance-invoice";
import {AnnualInvoice} from "../classes/annual-invoice";

//TODO annual/advances
export const getAllInvoices = async () => {
    return await execute<Invoice[]>(invoiceQueries.getAllInvoices, [], "rows");
};

//TODO annual/advances
export const getInvoiceById = async (id: Invoice['invoice_id']) => {
    const invoices = await execute<Invoice[]>(invoiceQueries.getInvoiceById, [id], "rows");

    return invoices[0];
};

const insertInvoice = async (invoice: Invoice) => {
    const newInvoice = await execute<Invoice[]>(invoiceQueries.addInvoice, [
        invoice.customer_id,
        invoice.creation_date,
        invoice.due_date,
        invoice.status_id,
        invoice.price,
        invoice.start_date,
        invoice.end_date,
        invoice.tariff_id
    ], "rows");

    return newInvoice[0].invoice_id;
};

export const insertAdvanceInvoice = async (advanceInvoice: AdvanceInvoice) => {
    const newInvoiceId = await insertInvoice(advanceInvoice);

    const rowCount = await execute<number>(invoiceQueries.addAdvanceInvoice, [
        newInvoiceId,
        advanceInvoice.estimated_consumption,
    ], "rowCount");

    return rowCount > 0;
}

export const insertAnnualInvoice = async (annualInvoice: AnnualInvoice) => {
    const newInvoiceId = await insertInvoice(annualInvoice);

    const rowCount = await execute<number>(invoiceQueries.addAnnualInvoice, [
        newInvoiceId,
        annualInvoice.actual_consumption,
        annualInvoice.advances_paid
    ], "rowCount");

    return rowCount > 0;
}
//
// export const updateInvoice = async (invoice: Invoice) => {
//     const rowCount = await execute<number>(invoiceQueries.updateInvoice, [
//         invoice.customer_id,
//         invoice.creation_date,
//         invoice.due_date,
//         invoice.status_id,
//         invoice.price,
//
//         invoice.invoice_id
//     ], "rowCount");
//
//     return rowCount > 0;
// };
//
// export const deleteInvoiceById = async (id: Invoice['invoice_id']) => {
//     const rowCount = await execute<number>(invoiceQueries.deleteInvoiceById, [id], "rowCount");
//
//     return rowCount > 0;
// };
