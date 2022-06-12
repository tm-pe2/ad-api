import { TABLES } from "./tables";

const insertMeter = `
    INSERT INTO ${TABLES.METERS} (
        meter_type,
        physical_id
    )
    VALUES ($1, null)
    RETURNING id
`;

const insertContractMeter = `
    INSERT INTO ${TABLES.CONTRACTS_METERS} (
        contract_id,
        meter_id
    )
    VALUES ($1, $2)
`;

export const meterQueries = {
    insertMeter: insertMeter,
    insertContractMeter: insertContractMeter,
}
