export const customerContractsQueries = {
    getAllCustomerContracts: `
        SELECT * FROM contracts as c
        INNER JOIN customercontracts as cc
        ON c.contract_id = cc.contract_id
    `,

    getContractsByCustomerId: `
        SELECT * FROM contracts as c
        INNER JOIN customercontracts as cc
        ON c.contract_id = cc.contract_id
        WHERE cc.customer_id = 1
    `,

    addCustomerContract: `
        INSERT INTO customercontracts (customer_id,	contract_id) VALUES($1, $2)
    `,

    updateCustomerContract: `
        UPDATE customercontracts
        SET
            customer_id = $1,
            contract_id = $2
        WHERE customer_id = $3 AND contract_id = $4
    `,

    deleteCustomerContractById: `
        DELETE FROM customercontracts WHERE contract_id = $1
    `
}