export const contractQueries = {
    getAllContracts: `
        SELECT * FROM contracts
    `,

    getContractById: `
        SELECT * FROM contracts WHERE contract_id = $1
    `,

    getContractByCustomerAndAddressID:`
        SELECT * FROM contracts as c
        INNER JOIN customercontracts as cc
        ON c.contract_id = cc.contract_id
        WHERE cc.customer_id = $1 AND c.service_type = $2 AND c.address_id = $3 
        AND  $4 BETWEEN c.start_date AND c.end_date
    `,

    addContract: `
        INSERT INTO contracts (start_date, end_date, customer_type, tariff_id, estimation_id, address_id, service_type)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `,

    updateContract: `
        UPDATE contracts 
        SET
            start_date = $1,
            end_date = $2,
            customer_type = $3,
            tariff_id = $4,
            estimation_id = $5
            address_id = $6
            service_type = 7
        WHERE contract_id = $8
    `,

    deleteContractById: `
        DELETE FROM contracts WHERE contract_id = $1
    `
};
