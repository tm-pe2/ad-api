import {execute} from "../utils/mysql.connector";
import {Invoice} from "../classes/invoice";
import {invoiceQueries} from "../queries/invoice-queries";

export function getAllInvoices(): Promise<Invoice[]> {
    const promise = new Promise<Invoice[]>((resolve,reject) => {
        execute<Invoice[]>(invoiceQueries.getAllInvoices, []).then((result) => {
            if(result)
                resolve(result);
            else
                reject("No invoices!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};

export function getInvoiceById(id: Invoice['invoice_id']): Promise<Invoice> {
    const promise = new Promise<Invoice>((resolve,reject) => {
        execute<Invoice>(invoiceQueries.getInvoiceById, [id]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("No invoices!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};

export function getInvoiceByPeriod(id: Invoice['customer_id'],startDate: Invoice['start_date'], endDate: Invoice['end_date']): Promise<Invoice[]> {
    const promise = new Promise<Invoice[]>((resolve,reject) => {
        execute<Invoice[]>(invoiceQueries.getInvoiceByPeriod, [id,startDate,endDate]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("No invoices!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};

export function insertInvoice(invoice: Invoice): Promise<number> {
    const promise = new Promise<number>((resolve,reject) => {
        execute<number>(invoiceQueries.addInvoice, [
            invoice.customer_id,
            invoice.supplier_id,
            invoice.creation_date,
            invoice.due_date,
            invoice.status_id,
            invoice.price,
            invoice.tax,
            invoice.start_date,
            invoice.end_date]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("Invoice could not be added!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};

export function updateInvoice(invoice: Invoice): Promise<number> {
    const promise = new Promise<number>((resolve,reject) => {
        execute<number>(invoiceQueries.updateInvoice, [
            invoice.customer_id,
            invoice.supplier_id,
            invoice.creation_date,
            invoice.due_date,
            invoice.status_id,
            invoice.price,
            invoice.tax,
            invoice.start_date,
            invoice.end_date,
            invoice.invoice_id]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("Invoice could not be updated!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};

export function deleteInvoiceById(id: Invoice['invoice_id']): Promise<number> {
    const promise = new Promise<number>((resolve,reject) => {
        execute<number>(invoiceQueries.deleteInvoiceById, [id]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("Invoice could not be deleted!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};
