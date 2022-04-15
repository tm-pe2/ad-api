import {execute} from "../utils/mysql.connector";
import {Contract} from "../classes/contracts";
import {contractQueries} from "../queries/contract-queries";

export const getAllContracts = async () => {
    return execute<Contract[]>(contractQueries.getAllContracts, []);
};

export const getContractById = async (id: Contract['ContractID']) => {
    return execute<Contract>(contractQueries.getContractById, [id]);
};

export const insertContract = async (contract: Contract) => {
    const result = await execute<{ affectedRows: number }>(contractQueries.addContract, [
        contract
    ]);
    return result.affectedRows > 0;
};

export const updateContract = async (contract: Contract) => {
    const result = await execute<{ affectedRows: number }>(contractQueries.updateContract, [
        contract.StartDate,
        contract.EndDate,
        contract.CustomerID,
        contract.CustomerType,
        contract.AdvancedPayement,
        contract.Price,
        contract.TarifID,
        contract.EstimatedID,
        contract.ContractID
    ]);
    return result.affectedRows > 0;
};

export const deleteContract = async (id: Contract['ContractID']) => {
    const result = await execute<{ affectedRows: number }>(contractQueries.deleteContractById, [id]);
    return result.affectedRows > 0;
};
