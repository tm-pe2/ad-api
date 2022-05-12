import {execute} from "../utils/mysql.connector";
import {Contract} from "../classes/contracts";
import {contractQueries} from "../queries/contract-queries";

export const getAllContracts = async () => {
    let contracts = execute<{rows: Contract[]}>(contractQueries.getAllContracts, []);
    console.log(contracts);
    return (await contracts).rows;
};

export const getContractById = async (id: Contract['ContractID']) => {
    let contract = execute<{rows: Contract}>(contractQueries.getContractById, [id]);
    console.log(contract);
    return (await contract).rows;
};

export const insertContract = async (contract: Contract) => {
    const result = await execute<{ rowCount: number }>(contractQueries.addContract, [
        contract
    ]);
    return result.rowCount > 0;
};

export const updateContract = async (contract: Contract) => {
    const result = await execute<{ rowCount: number }>(contractQueries.updateContract, [
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
    return result.rowCount > 0;
};

export const deleteContract = async (id: Contract['ContractID']) => {
    const result = await execute<{ rowCount: number }>(contractQueries.deleteContractById, [id]);
    return result.rowCount > 0;
};
