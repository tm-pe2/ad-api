import {execute} from "../utils/mysql.connector";
import {Contract} from "../classes/contracts";
import {contractQueries} from "../queries/contract-queries";

export const getAllContracts = async () => {
    return await execute<Contract[]>(contractQueries.getAllContracts, [], "rows");
};

export const getContractById = async (id: Contract['contract_id']) => {
    const contracts = await execute<Contract[]>(contractQueries.getContractById, [id], "rows");
    return contracts[0];
};

export const getContractsByCustomerAndAddressID = async (customerID: Contract['customer_id'],contractType: Contract['contract_type'],addressID: Contract['address_id'], endDate: Contract['end_date']) => {
    return await execute<Contract[]>(contractQueries.getContractByCustomerAndAddressID, [customerID,contractType,addressID,endDate], "rows");
};

export const insertContract = async (contract: Contract) => {
    const rowCount = await execute<number>(contractQueries.addContract, [
        contract.start_date,
        contract.end_date,
        contract.customer_id,
        contract.customer_type,
        contract.advance_payment,
        contract.price,
        contract.tariff_id,
        contract.estimation_id,
        contract.address_id,
        contract.contract_type
    ], "rowCount");

    return rowCount > 0;
};

export const updateContract = async (contract: Contract) => {
    const rowCount = await execute<number>(contractQueries.updateContract, [
        contract.start_date,
        contract.end_date,
        contract.customer_id,
        contract.customer_type,
        contract.advance_payment,
        contract.price,
        contract.tariff_id,
        contract.estimation_id,
        contract.contract_id
    ], "rowCount");

    return rowCount > 0;
};

export const deleteContract = async (id: Contract['contract_id']) => {
    const rowCount = await execute<number>(contractQueries.deleteContractById, [id], "rowCount");

    return rowCount > 0;
};
