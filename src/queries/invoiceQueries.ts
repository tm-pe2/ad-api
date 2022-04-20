export const InvoiceQueries = {
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
            ClientID = ?,
            SupplierID = ?,
            Date = ?,
            DueDate = ?,
            Type = ?,
            Amount = ?,
            Price = ?,
            Tax = ?,
            Status = ?
        WHERE InvoiceID = ?
    `,
  
    deleteInvoiceById: `
        DELETE FROM invoices WHERE InvoiceID = ?
    `
  };
