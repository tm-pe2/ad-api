export const invoiceQueries = {
    getAllInvoices: `
        SELECT * FROM invoices
    `,

    getInvoiceById: `
        SELECT * FROM invoices WHERE invoice_id = $1
    `,

    addInvoice: `
        INSERT INTO invoices SET $1
    `,

    updateInvoice: `
        UPDATE invoices SET
            customer_id = $1,
            supplier_id = $2,
            date = $3,
            due_date = $4,
            status = $5,
            gas_amount = $6,
            electricity_type = $7,
            price = $8,
            tax = $9,
            start_date = $10,
            end_date = $11
        WHERE invoice_id = $12
    `,

    deleteInvoiceById: `
        DELETE FROM invoices WHERE invoice_id = $1
    `
};
