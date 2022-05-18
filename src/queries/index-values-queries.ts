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
            date = $1
            index_values = $2
        WHERE index_id = $3
    `,

    deleteIndexValues: `
        DELETE FROM indexvalues WHERE index_id = $1
    `
}
