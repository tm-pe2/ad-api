import { Invoice } from "../classes/invoice";
import { execute } from "../utils/mysql.connector";

//TODO change name to be more descriptive gets all unpaided invoices that are late
export const getAllUnpaidInvoices = async () => {
    console.log(new Date().toISOString());
    
    let invoices = execute<{rows: Invoice[]}>('SELECT * FROM invoices WHERE "DueDate" <= $1;', [new Date().toISOString()]);
    return (await invoices).rows;
};
