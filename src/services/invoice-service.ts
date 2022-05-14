import {execute} from "../utils/mysql.connector";
import {Invoice} from "../classes/invoice";
import {invoiceQueries} from "../queries/invoice-queries";
import {Contract} from "../classes/contracts";

export const getAllInvoices = async () => {
    return await execute<Invoice[]>(invoiceQueries.getAllInvoices, [], "rows");
};

export const getInvoiceById = async (id: Invoice['invoice_id']) => {
    const invoices = await execute<Invoice[]>(invoiceQueries.getInvoiceById, [id], "rows");
    return invoices[0];
};

export const getInvoiceByPeriod = async (id: Invoice['customer_id'],startDate: Invoice['start_date'], endDate: Invoice['end_date']) => {
    const invoices = await execute<Invoice[]>(invoiceQueries.getInvoiceByPeriod, [startDate,endDate], "rows");
    return invoices[0];
};

export const insertInvoice = async (invoice: Invoice) => {
    const rowCount = await execute<number>(invoiceQueries.addInvoice, [
        invoice.customer_id,
        invoice.supplier_id,
        invoice.creation_date,
        invoice.due_date,
        invoice.status_id,
        invoice.price,
        invoice.tax,
        invoice.start_date,
        invoice.end_date
    ], "rowCount");

    return rowCount > 0;
};

export const updateInvoice = async (invoice: Invoice) => {
    const rowCount = await execute<number>(invoiceQueries.updateInvoice, [
        invoice.customer_id,
        invoice.supplier_id,
        invoice.creation_date,
        invoice.due_date,
        invoice.status_id,
        invoice.price,
        invoice.tax,
        invoice.start_date,
        invoice.end_date,

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
