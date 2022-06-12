import { TABLES } from "./tables";


//TODO select specific colums
const getAllInvoices = `SELECT u.first_name, i.price, i.due_date, i.tax
    FROM ${TABLES.INVOICES} i
    JOIN ${TABLES.CONTRACTS} c ON i.contract_id = c.id
    JOIN ${TABLES.USERS_ADDRESSES} ua ON c.address_id = ua.address_id
    JOIN ${TABLES.USERS} u ON ua.user_id = u.id`;

    const getInvoicesByUserId = getAllInvoices + `where u.id = $1
    `

export const invoiceQueries = {
    getAllInvoices: getAllInvoices,
    getInvoicesByUserId: getInvoicesByUserId
}
