import { TABLES } from "./tables";


//TODO select specific colums
const getAllInvoicesOld = `SELECT u.first_name, u.last_name, i.price, i.due_date, i.tax
    FROM ${TABLES.INVOICES} i
    JOIN ${TABLES.CONTRACTS} c ON i.contract_id = c.id
    JOIN ${TABLES.USERS_ADDRESSES} ua ON c.address_id = ua.address_id
    JOIN ${TABLES.USERS} u ON ua.user_id = u.id`;

const getAllInvoices = `
    SELECT
        i.id,
        i.contract_id,
        i.supplier_id,
        i.price,
        i.tax,
        i.creation_date,
        i.due_date,
        i.period_start,
        i.period_end,
        i.type_id as type,
        json_build_object(
            'id', a.id,
            'street', a.street,
            'house_number', a.house_number,
            'city_name', ci.city_name,
            'postal_code', ci.postal_code,
            'country', a.country
        ) as address,
        json_build_object(
            'id', u.id,
            'first_name', u.first_name,
            'last_name', u.last_name,
            array_agg(r.id) as roles
        ) as user,

    FROM ${TABLES.INVOICES} as i
    LEFT JOIN ${TABLES.CONTRACTS} as c ON i.contract_id = c.id
    LEFT JOIN ${TABLES.USERS_ADDRESSES} as ua ON c.address_id = ua.address_id
    LEFT JOIN ${TABLES.USERS} as u ON ua.user_id = u.id
    LEFT JOIN ${TABLES.ADDRESSES} as a ON ua.address_id = a.id
    LEFT JOIN ${TABLES.CITIES} as ci ON a.city_id = ci.id
    LEFT JOIN ${TABLES.CUSTOMERS} as cu ON u.id = cu.user_id
    LEFT JOIN ${TABLES.USERS_ROLES} as ur ON u.id = ur.user_id
    LEFT JOIN ${TABLES.ROLES} as r ON ur.role_id = r.id
`
const getInvoicesByUserId = getAllInvoices + ` WHERE u.id = $1 AND u.active = True`

export const invoiceQueries = {
    getAllInvoices: getAllInvoices,
    getInvoicesByUserId: getInvoicesByUserId
}
