export const supplierQueries = {
    getAllSuppliers: `
        SELECT * FROM suppliers
    `,

    getSupplierById: `
        SELECT * FROM suppliers WHERE SupplierID = $1
    `,

    addSupplier: `
        INSERT INTO suppliers SET $1
    `,

    updateSupplier: `
        UPDATE suppliers 
        SET
            Name = $1,
            SupplyType = $2,
            CompanyName = $3,
            AdressID = $4
        WHERE SupplierID = $5
    `,

    deleteSupplierById: `
        DELETE FROM suppliers WHERE SupplierID = $1
    `
};
