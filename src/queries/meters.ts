import { TABLES } from "./tables";

const selectMeters = `
    SELECT 
        m.id,
        m.meter_type,
        m.physical_id 
    FROM ${TABLES.METERS} m
    LEFT JOIN ${TABLES.CONTRACTS_METERS} cm ON m.id = cm.meter_id
`;

const insertMeter = `
    INSERT INTO ${TABLES.METERS} (
        meter_type,
        physical_id
    )
    VALUES ($1, $2)
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
    getMetersByContractId: selectMeters + `
        WHERE cm.contract_id = $1;
    `
}
