export const invoiceQueries = {
    getAllInvoices: `
        SELECT * FROM invoices
    `,

    getInvoiceById: `
        SELECT * FROM invoices WHERE invoice_id = $1
    `,

    getInvoiceByPeriod: `
        Select * FROM invoices 
        WHERE customer_id = $1 AND start_date = $2 AND end_date = $3
    `,

    addInvoice: `
        INSERT INTO invoices (customer_id, supplier_id, creation_date, due_date, status_id, price, tax, start_date, end_date)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `,

    updateInvoice: `
        UPDATE invoices SET
            customer_id = $1,
            supplier_id = $2,
            creation_date = $3,
            due_date = $4,
            status_id = $5,
            price = $6,
            tax = $7,
            start_date = $8,
            end_date = $9
        WHERE invoice_id = $10
    `,

    deleteInvoiceById: `
        DELETE FROM invoices WHERE invoice_id = $1
    `,

    getInvoiceByIdAndContractPeriod: `
        SELECT * FROM invoices 
        WHERE contract_id = $1 AND start_date = $2 AND end_date = $3
    `,
};
