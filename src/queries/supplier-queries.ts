export const supplierQueries = {
    getAllSuppliers: `
        SELECT * FROM suppliers
    `,

    getSupplierById: `
        SELECT * FROM suppliers WHERE SupplierID = ?
    `,

    addSupplier: `
        INSERT INTO suppliers SET ?
    `,

    updateSupplier: `
        UPDATE suppliers 
        SET
            Name = ?,
            SupplyType = ?,
            CompanyName = ?,
            AdressID = ?
        WHERE SupplierID = ?
    `,

    deleteSupplierById: `
        DELETE FROM suppliers WHERE SupplierID = ?
    `
};
