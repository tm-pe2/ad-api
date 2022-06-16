import { TABLES } from "./tables"

const selectSupplierQuery = `
    SELECT 
    s.id, 
    s.company_name, 
    s.service_type, 
    s.vat_number,  
    json_build_object(
            'id', a.id,
            'street', a.street,
            'house_number', a.house_number,
            'city_name',ci.city_name,
            'postal_code',ci.postal_code,
            'country',a.country
    )as address
    FROM ${TABLES.SUPPLIERS} as s
    LEFT JOIN ${TABLES.ADDRESSES} as a ON s.address_id = a.id
    LEFT JOIN ${TABLES.CITIES} as ci ON a.city_id = ci.id
    `
const insertSupplier = `
    INSERT INTO ${TABLES.SUPPLIERS} as c (company_name, service_type, vat_number, address_id) VALUES ($1, $2, $3, $4)
`
// modify supplier
const modifySupplier = `
    UPDATE ${TABLES.SUPPLIERS} SET company_name = $2, service_type = $3, vat_number = $4, address_id = $5 WHERE id = $1;
`
const modifyAddress = `
    UPDATE ${TABLES.ADDRESSES} SET street = $2, house_number = $3, city_id = $4, country = $5 WHERE id = $1
`
export const supplierQueries = {
    getAllSuppliers: selectSupplierQuery + `GROUP BY s.id, a.id, ci.id, ci.city_name, ci.postal_code, a.country, a.street, a.house_number`,
    getSupplierById: selectSupplierQuery + `
        WHERE s.id = $1
        GROUP BY s.id, a.id, ci.id, ci.city_name, ci.postal_code, a.street, a.house_number, a.country
    `,
    insertSupplier: insertSupplier,
    modifyAddress: modifyAddress,
    modifySupplier: modifySupplier,
}