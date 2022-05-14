import {execute} from "../utils/mysql.connector";
import {CustomerContracts} from '../classes/customer-contracts';
import {customerContractsQueries} from '../queries/customer-contracts-queries';

export const getAllCustomersContracts = async () => {
    return await execute<CustomerContracts[]>(customerContractsQueries.getAllCustomerContracts, [], "rows");
};

export const getContractsByCustomerId = async (id: CustomerContracts['customer_id']) => {
    return await execute<CustomerContracts[]>(customerContractsQueries.getContractsByCustomerId, [id], "rows");
};

export const insertCustomerContract = async (customerContract: CustomerContracts) => {
    const rowCount = await execute<number>(customerContractsQueries.addCustomerContract, [
        customerContract.customer_id,
        customerContract.contract_id
    ], "rowCount");

    return rowCount;
};

export const updateContractMeters = async (customerContract: CustomerContracts) => {
    const rowCount = await execute<number>(customerContractsQueries.addCustomerContract, [
        customerContract.customer_id,
        customerContract.contract_id
    ], "rowCount");

    return rowCount;
}

export const deleteContractMeters = async (id: CustomerContracts['contract_id']) => {
    const rowCount = await execute<number>(customerContractsQueries.deleteCustomerContractById, [id], "rowCount");
    return rowCount > 0;
}