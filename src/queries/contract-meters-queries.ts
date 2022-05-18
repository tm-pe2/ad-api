export const contractMetersQueries = {
    getAllContractMeters: `
        SELECT * FROM contractmeters
    `,

    getContractMetersByID: `
        SELECT * FROM contractmeters WHERE contract_id = $1
    `,

    addContractMeters: `
        INSERT INTO contractmeters (contract_id, meter_id)
            VALUES ($1, $2)
    `,

    UpdateContractMeters: `
        UPDATE contractmeters
        SET
            contract_id = $1,
            meter_id = $2,
        WHERE contract_id = $3 AND meter_id = $4
    `,

    deleteContractMetersByIDs: `
        DELETE FROM contractmeters WHERE contract_id = $1 AND meter_id = $2
    `
};