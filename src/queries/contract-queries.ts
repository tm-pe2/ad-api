export const contractQueries = {
    getAllContracts: `
        SELECT * FROM customercontracts
    `,

    getContractById: `
        SELECT * FROM customercontracts WHERE ContractID = ?
    `,

    addContract: `
        INSERT INTO customercontracts SET ?
    `,

    updateContract: `
        UPDATE customercontracts 
        SET
            StartDate = ?,
            EndDate = ?,
            CustomerID = ?,
            CustomerType = ?,
            AdvancedPayement = ?,
            Price = ?,
            TarifID = ?,
            EstimatedID = ?
        WHERE ContractID = ?
    `,

    deleteContractById: `
        DELETE FROM customercontracts WHERE ContractID = ?
    `
};
