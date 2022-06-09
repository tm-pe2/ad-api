const enum tables {
    invoices = "invoices",
    contracts = "contracts",
    userAddresses = "useraddress",
    users = "users"
}
//TODO select specific colums
const getAllInvoices = `SELECT i.price, u.first_name
    FROM ${tables.invoices} i
    JOIN ${tables.contracts} c ON i.contract_id = c.contract_id
    JOIN ${tables.userAddresses} ua ON c.address_id = ua.address_id
    JOIN ${tables.users} u ON ua.user_id = u.user_id`;


export const invoiceQueries = {
    getAllInvoices: getAllInvoices
}
