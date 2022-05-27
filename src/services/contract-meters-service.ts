import {execute} from "../utils/database-connector";
import {ContractMeters} from '../classes/contract-meters';
import {contractMetersQueries} from '../queries/contract-meters-queries';

export const getAllContractMeters = async () => {
    return await execute<ContractMeters[]>(contractMetersQueries.getAllContractMeters, [], "rows");
};

export const getContractMetersById = async (id: ContractMeters['contract_id']) => {
    return await execute<ContractMeters[]>(contractMetersQueries.getContractMetersByID, [id], "rows");
};

export const insertContractMeters = async (contractMeter: ContractMeters) => {
    const rowCount = await execute<number>(contractMetersQueries.addContractMeters, [
        contractMeter.contract_id,
        contractMeter.meter_id
    ], "rowCount");

    return rowCount;
};

export const updateContractMeters = async (contractMeter: ContractMeters) => {
    const rowCount = await execute<number>(contractMetersQueries.addContractMeters, [
        contractMeter.contract_id,
        contractMeter.meter_id,
    ], "rowCount");

    return rowCount;
}

export const deleteContractMeters = async (contractID: ContractMeters['contract_id'], meterID: ContractMeters['meter_id']) => {
    const rowCount = await execute<number>(contractMetersQueries.addContractMeters, [contractID,meterID], "rowCount");
    return rowCount > 0;
}
