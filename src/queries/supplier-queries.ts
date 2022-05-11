export const supplierQueries = {
    getAllSuppliers: `
        SELECT * FROM suppliers
    `,

    getSupplierById: `
        SELECT * FROM suppliers WHERE supplier_id = $1
    `,
    getSupplierByVAT: `
        SELECT * FROM suppliers WHERE vat_number = $1
    `,

    addSupplier: `
        INSERT INTO suppliers (name, supply_type, company_name, address_id, vat_number)
            VALUES ($1, $2, $3, $4, $5)
    `,

    updateSupplier: `
        UPDATE suppliers 
        SET
            name = $1,
            supply_type = $2,
            company_name = $3,
            address_id = $4,
            vat_number = $5
        WHERE supplier_id = $6
    `,

    deleteSupplierById: `
        DELETE FROM suppliers WHERE supplier_id = $1
    `
};
