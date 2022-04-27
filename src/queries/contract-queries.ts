export const contractQueries = {
    getAllContracts: `
        SELECT * FROM customercontracts
    `,

    getContractById: `
        SELECT * FROM customercontracts WHERE ContractID = $1
    `,

    addContract: `
        INSERT INTO customercontracts SET $1
    `,

    updateContract: `
        UPDATE customercontracts 
        SET
            StartDate = $1,
            EndDate = $2,
            CustomerID = $3,
            CustomerType = $4,
            AdvancedPayement = $5,
            Price = $6,
            TarifID = $7,
            EstimatedID = $8
        WHERE ContractID = $9
    `,

    deleteContractById: `
        DELETE FROM customercontracts WHERE ContractID = $1
    `
};
