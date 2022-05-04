export const supplierQueries = {
    getAllSuppliers: `
        SELECT * FROM suppliers
    `,

    getSupplierById: `
        SELECT * FROM suppliers WHERE supplier_id = $1
    `,

    addSupplier: `
        INSERT INTO suppliers SET $1
    `,

    updateSupplier: `
        UPDATE suppliers 
        SET
            name = $1,
            supply_type = $2,
            company_name = $3,
            adress_id = $4
        WHERE supplier_id = $5
    `,

    deleteSupplierById: `
        DELETE FROM suppliers WHERE supplier_id = $1
    `
};
