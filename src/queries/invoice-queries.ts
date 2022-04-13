export const invoiceQueries = {
    getAllInvoices: `
        SELECT * FROM invoices
    `,

    getInvoiceById: `
        SELECT * FROM invoices WHERE InvoiceID = ?
    `,

    addInvoice: `
        INSERT INTO invoices SET ?
    `,

    updateInvoice: `
        UPDATE invoices SET
            CustomerID = ?,
            SupplierID = ?,
            Date = ?,
            DueDate = ?,
            Status = ?,
            GasAmount = ?,
            ElectricityType = ?,
            Price = ?,
            Tax = ?,
            StartDate = ?,
            EndDate = ?
        WHERE InvoiceID = ?
    `,

    deleteInvoiceById: `
        DELETE FROM invoices WHERE InvoiceID = ?
    `
};
