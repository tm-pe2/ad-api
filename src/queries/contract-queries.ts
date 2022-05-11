export const contractQueries = {
    getAllContracts: `
        SELECT * FROM customercontracts
    `,

    getContractById: `
        SELECT * FROM customercontracts WHERE contract_id = $1
    `,

    getContractByCustomerAndAddressID:`
        SELECT * FROM customercontracts
        WHERE customer_id = $1 AND contract_type = $2 AND address_id = $3 
        AND  $4 BETWEEN start_date AND end_date
    `,

    addContract: `
        INSERT INTO customercontracts (start_date, end_date, customer_id, customer_type, advance_payment, price, tariff_id, estimation_id, address_id, contract_type)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
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
            address_id = $9
            contract_type = 10
        WHERE contract_id = $11
    `,

    deleteContractById: `
        DELETE FROM customercontracts WHERE contract_id = $1
    `
};
