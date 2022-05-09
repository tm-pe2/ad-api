export const tariffQueries = {
    getAllTariffs: `
        SELECT * FROM tariffs
    `,

    getTariffById: `
        SELECT * FROM tariffs WHERE tariff_id = $1
    `,

    addTariff: `
        INSERT INTO tariffs (customer_type, value)
            VALUES  ($1, $2)
    `,

    updateTariff: `
        UPDATE tariffs 
        SET
            customer_type = $1,
            value = $2
        WHERE tariff_id = $3
    `,

    deleteTariffById: `
        DELETE FROM tariffs WHERE tariff_id = $1
    `
};
