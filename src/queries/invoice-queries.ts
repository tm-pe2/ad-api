export const invoiceQueries = {
    getAllInvoices: `
        SELECT * FROM invoices
    `,

    getInvoiceById: `
        SELECT * FROM invoices WHERE invoice_id = $1
    `,

    addInvoice: `
        INSERT INTO invoices (customer_id, creation_date, due_date, status_id, price, start_date, end_date, tariff_id)
            VALUES ($1, $2, $3, $4, $5, $6)
    `,

    addAdvanceInvoice: `
        INSERT INTO advance_invoices (invoice_id, estimated_consumption)
            VALUES ($1, $2)
    `,

    addAnnualInvoice: `
        INSERT INTO annual_invoices (invoice_id, actual_consumption, advances_paid)
            VALUES ($1, $2, $3)
    `,

    // updateInvoice: `
    //     UPDATE invoices SET
    //         customer_id = $1,
    //         creation_date = $3,
    //         due_date = $4,
    //         status_id = $5,
    //
    //
    //         price = $8,
    //         tax = $9,
    //         start_date = $10,
    //         end_date = $11
    //     WHERE invoice_id = $12
    // `,
    //
    // deleteInvoiceById: `
    //     DELETE FROM invoices WHERE invoice_id = $1
    // `
};
