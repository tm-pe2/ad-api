export const tariffQueries = {
    getAllTariffs: `
        SELECT * FROM tariffs
    `,

    getTariffById: `
        SELECT * FROM tariffs WHERE tariff_id = $1
    `,

    addTariff: `
        INSERT INTO tariffs SET $1
    `,

    updateTariff: `
        UPDATE tariffs 
        SET
            small_ind = $1,
            medium_ind = $2,
            big_ind = $3,
            small_comp = $4,
            medium_comp = $5,
            big_comp = $6
        WHERE tariff_id = $7
    `,

    deleteTariffById: `
        DELETE FROM tariffs WHERE tariff_id = $1
    `
};
