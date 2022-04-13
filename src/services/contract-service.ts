import {execute} from "../utils/mysql.connector";
import {Contract} from "../classes/contracts";
import {contractQueries} from "../queries/contract-queries";

export const getAllContracts = async () => {
    return execute<Contract[]>(contractQueries.getAllContracts, []);
};

export const getContractById = async (id: Contract['contractId']) => {
    return execute<Contract>(contractQueries.getContractById, [id]);
};

export const insertContract = async (contract: Contract) => {
    const result = await execute<{ affectedRows: number }>(contractQueries.addContract, [
        contract.toJSON()
    ]);
    return result.affectedRows > 0;
};

export const updateContract = async (contract: Contract) => {
    const result = await execute<{ affectedRows: number }>(contractQueries.updateContract, [
        contract.startDate,
        contract.endDate,
        contract.customerId,
        contract.customerType,
        contract.advancedPayment,
        contract.price,
        contract.tariffId,
        contract.estimatedId,
        contract.contractId
    ]);
    return result.affectedRows > 0;
};

export const deleteContract = async (id: Contract['contractId']) => {
    const result = await execute<{ affectedRows: number }>(contractQueries.deleteContractById, [id]);
    return result.affectedRows > 0;
};
