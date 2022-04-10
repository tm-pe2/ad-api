import {execute} from "../utils/mysql.connector";
import {Contract} from "../classes/contracts";
import {ContractQueries} from "../queries/contractQueries";

export const getAllContracts = async () => {
    return execute<Contract[]>(ContractQueries.getAllContracts, []);
};

export const getContractById = async (id: Contract['ContractID']) => {
    return execute<Contract>(ContractQueries.getContractById, [id]);
};

export const insertContract = async (contract: Contract) => {
    const result = await execute<{ affectedRows: number }>(ContractQueries.addContract, [contract]);
    return result.affectedRows > 0;
};

export const updateContract = async (contract: Contract) => {
    const result = await execute<{ affectedRows: number }>(ContractQueries.updateContract, [
        contract.getStartDate,
        contract.getEndDate,
        contract.getClientID,
        contract.getClientType,
        contract.getAdvancedPayment,
        contract.getPrice,
        contract.getContractID
    ]);
    return result.affectedRows > 0;
};

export const deleteContract = async (id: Contract['ContractID']) => {
    const result = await execute<{ affectedRows: number }>(ContractQueries.deleteContractById, [id]);
    return result.affectedRows > 0;
};
