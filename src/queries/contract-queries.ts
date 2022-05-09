export const contractQueries = {
    getAllContracts: `
        SELECT * FROM customercontracts
    `,

    getContractById: `
        SELECT * FROM customercontracts WHERE contract_id = $1
    `,

    addContract: `
        INSERT INTO customercontracts (start_date, end_date, customer_id, customer_type, advance_payment, price, tariff_id, estimation_id)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `,

    updateContract: `
        UPDATE customercontracts 
        SET
            start_date = $1,
            end_date = $2,
            customer_id = $3,
            customer_type = $4,
            advance_payment = $5,
            price = $6,
            tariff_id = $7,
            estimation_id = $8
        WHERE contract_id = $9
    `,

    deleteContractById: `
        DELETE FROM customercontracts WHERE contract_id = $1
    `,

    getAllActiveContracts: `
        SELECT * FROM customercontracts as cc
           JOIN tariffs as t ON cc.tariff_id = t.tariff_id
           JOIN customers as c ON cc.customer_id = c.customer_id
           join users as u ON c.user_id = u.user_id
         WHERE start_date <= $1 AND end_date >= $1
    `,
};
