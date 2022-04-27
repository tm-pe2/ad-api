export const invoiceQueries = {
    getAllInvoices: `
        SELECT * FROM invoices
    `,

    getInvoiceById: `
        SELECT * FROM invoices WHERE InvoiceID = $1
    `,

    addInvoice: `
        INSERT INTO invoices SET $1
    `,

    updateInvoice: `
        UPDATE invoices SET
            CustomerID = $1,
            SupplierID = $2,
            Date = $3,
            DueDate = $4,
            Status = $5,
            GasAmount = $6,
            ElectricityType = $7,
            Price = $8,
            Tax = $9,
            StartDate = $10,
            EndDate = $11
        WHERE InvoiceID = $12
    `,

    deleteInvoiceById: `
        DELETE FROM invoices WHERE InvoiceID = $1
    `
};
