import { TABLES } from "./tables";


//TODO select specific colums
const getAllInvoices = `SELECT i.price, u.first_name
    FROM ${TABLES.INVOICES} i
    JOIN ${TABLES.CONTRACTS} c ON i.contract_id = c.contract_id
    JOIN ${TABLES.USERS_ADDRESSES} ua ON c.address_id = ua.address_id
    JOIN ${TABLES.USERS} u ON ua.user_id = u.user_id`;


export const invoiceQueries = {
    getAllInvoices: getAllInvoices
}
