export const indexValuesQueries = {
    getAllIndexValues: `
        SELECT * FROM indexvalues
    `,

    getIndexValuesByMeterId: `
        SELECT * FROM indexvalues WHERE meter_id = $1
    `,

    addIndexValues: `
        INSERT INTO indexvalues (meter_id, date, index_value) VALUES ($1, $2, $3)
    `,

    updateIndexValues: `
        UPDATE indexvalues
        SET
            meter_id = $1
            date = $2
            index_values = $3
        WHERE index_id = $4
    `,

    deleteIndexValues: `
        DELETE FROM indexvalues WHERE index_id = $1
    `
}
