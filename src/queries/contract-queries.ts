export const contractQueries = {
    getAllContracts: `
        SELECT * FROM customercontracts
    `,

    getContractById: `
        SELECT * FROM customercontracts WHERE contract_id = $1
    `,

    addContract: `
        INSERT INTO customercontracts SET $1
    `,

    updateContract: `
        UPDATE customercontracts 
        SET
            start_date = $1,
            end_date = $2,
            customer_id = $3,
            customer_type = $4,
            advanced_payement = $5,
            price = $6,
            tariff_id = $7,
            estimated_id = $8
        WHERE contract_id = $9
    `,

    deleteContractById: `
        DELETE FROM customercontracts WHERE contract_id = $1
    `
};
