import { TABLES } from "./tables"

const selectSupplierQuery = `
    SELECT 
    s.id, 
    s.company_name, 
    s.service_type, 
    s.vat_number,  
    json_agg(
        json_build_object(
            'id', a.id,
            'street', a.street,
            'house_number', a.house_number,
            'city_name',ci.city_name,
            'postal_code',ci.postal_code,
            'country',a.country)
        ) as address
    FROM ${TABLES.SUPPLIERS} as s
    LEFT JOIN ${TABLES.ADDRESSES} as a ON s.address_id = a.id
    `
const insertSupplier = `
    INSERT INTO ${TABLES.SUPPLIERS} as c (id, company_name, service_type, vat_number, address_id) VALUES ($1, $2, $3, $4, $5)
`
export const supplierQueries = {
    getAllSuppliers: selectSupplierQuery + `GROUP BY s.id`,
    getSupplierById: selectSupplierQuery + `
        WHERE s.id = $1
        GROUP BY s.id
    `,
    insertSupplier: insertSupplier
}