export const ContractQueries = {
    getAllContracts: `
        SELECT * FROM clientcontracts
    `,
  
    getContractById: `
        SELECT * FROM clientcontracts WHERE ContractID = ?
    `,
  
    addContract: `
        INSERT INTO clientcontracts SET ?
    `,
  
    updateContract: `
        UPDATE clientcontracts SET
            StartDate = ?,
            EndDate = ?,
            ClientID = ?,
            ClientType = ?,
            AdvancedPayement = ?,
            Price = ?
        WHERE ContractID = ?
    `,
  
    deleteContractById: `
        DELETE FROM clientcontracts WHERE ContractID = ?
    `
  };
