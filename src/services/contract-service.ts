import {execute} from "../utils/mysql.connector";
import {Contract} from "../classes/contracts";
import {contractQueries} from "../queries/contract-queries";

export const getAllContracts = async () => {
    let contracts = execute<{rows: Contract[]}>(contractQueries.getAllContracts, []);
    console.log(contracts);
    return (await contracts).rows;
};

export const getContractById = async (id: Contract['contract_id']) => {
    let contract = execute<{rows: Contract}>(contractQueries.getContractById, [id]);
    console.log(contract);
    return (await contract).rows;
};

export const insertContract = async (contract: Contract) => {
    const result = await execute<{ rowCount: number }>(contractQueries.addContract, [
        contract.start_date,
        contract.end_date,
        contract.customer_id,
        contract.customer_type,
        contract.advance_payment,
        contract.price,
        contract.tariff_id,
        contract.estimation_id,
    ]);
    return result.rowCount > 0;
};

export const updateContract = async (contract: Contract) => {
    const result = await execute<{ rowCount: number }>(contractQueries.updateContract, [
        contract.start_date,
        contract.end_date,
        contract.customer_id,
        contract.customer_type,
        contract.advance_payment,
        contract.price,
        contract.tariff_id,
        contract.estimation_id,
        contract.contract_id
    ]);
    return result.rowCount > 0;
};

export const deleteContract = async (id: Contract['contract_id']) => {
    const result = await execute<{ rowCount: number }>(contractQueries.deleteContractById, [id]);
    return result.rowCount > 0;
};
