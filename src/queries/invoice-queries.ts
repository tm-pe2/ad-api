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
        INSERT INTO invoices (contract_id, supplier_id, creation_date, due_date, status_id, price, tax, period_start, period_end, tariff_rate)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    `,

    updateInvoice: `
        UPDATE invoices SET
            contract_id = $1,
            supplier_id = $2,
            creation_date = $3,
            due_date = $4,
            status_id = $5,
            price = $6,
            tax = $7,
            period_start = $8,
            period_end = $9,
            tariff_rate = $10
        WHERE invoice_id = $11
    `,

    deleteInvoiceById: `
        DELETE FROM invoices WHERE invoice_id = $1
    `,

    getInvoiceByIdAndContractPeriod: `
        SELECT * FROM invoices 
        WHERE contract_id = $1 AND period_start = $2 AND period_end = $3
    `,

    getInvoicePdfData: `
        SELECT *
        FROM invoices i
            JOIN contracts co ON co.contract_id = i.contract_id
            JOIN customercontracts cc ON cc.contract_id = co.contract_id
            JOIN address a ON a.address_id = co.address_id
            JOIN customers cu ON cc.customer_id = cu.customer_id
            JOIN users u ON u.user_id = cu.user_id
            JOIN estimations e ON e.estimation_id = co.estimation_id
        WHERE i.invoice_id = $1
    `,

    getInvoiceByUserId: `
        SELECT 
            i.invoice_id,
            i.contract_id, 
            i.supplier_id, 
            i.creation_date, 
            i.due_date, 
            i.status_id, 
            i.price, 
            i.tax, 
            i.tariff_rate, 
            i.period_start, 
            i.period_end 
        FROM invoices i
            JOIN contracts co ON i.contract_id = co.contract_id
            JOIN customercontracts cc ON co.contract_id = cc.contract_id
            JOIN customers cu ON cu.customer_id = cc.customer_id
            JOIN users u ON u.user_id = cu.user_id
        WHERE cu.user_id = $1
    `
};
