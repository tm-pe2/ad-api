export const metersQueries = {
    getAllMeters: `
        SELECT * FROM meters
    `,

    getMeterById: `
        SELECT * FROM meters WHERE meter_id = $1
    `,

    addMeter: `
        INSERT INTO meters (meter_type, physical_id) 
            VALUES ($1, $2)
    `,

    updateMeter: `
        UPDATE meters
        SET
            meter_type = $1, 
            physical_id = $2
        WHERE meter_id = $3
    `,

    deleteMeter: `
        DELETE FROM meters WHERE meter_id = $1
    `,

    getMetersByContractId: `
        SELECT
            m.meter_id,
            m.meter_type,
            m.physical_id,
            cm.contract_id
        FROM meters m
        JOIN contractmeters cm ON cm.meter_id = m.meter_id
        WHERE cm.contract_id = $1
    `
}
