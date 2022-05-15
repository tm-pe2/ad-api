export const consumptionQueries = {
    getAllConsumptions: `
        SELECT * FROM consumption
    `,

    getConsumptionById: `
        SELECT * FROM consumption WHERE consumption_id = $1
    `,

    addConsumption: `
        INSERT INTO consumption (meter_id,consumtion,date)
            VALUES ($1, $2, $3)
    `,

    updateConsumption: `
        UPDATE consumption
        SET
            meter_id = $1,
            consumption = $2,
            date = $3
        WHERE consumption_id = $4
    `,

    deleteConsumptionById: `
        DELETE FROM consumption WHERE consumption_id = $1
    `,

    getConsumptionByMeterIdAndPeriod: `
        SELECT * FROM consumption
        WHERE meter_id = $1 AND date > $2 AND date < $3
    `
};
