export const tariffQueries = {
    getAllTariffs: `
        SELECT * FROM tarifs
    `,

    getTariffById: `
        SELECT * FROM tarifs WHERE TarifID = $1
    `,

    addTariff: `
        INSERT INTO tarifs SET $1
    `,

    updateTariff: `
        UPDATE tarifs 
        SET
            SmallInd = $1,
            MediumInd = $2,
            BigInd = $3,
            SmallComp = $4,
            MediumComp = $5,
            BigComp = $6
        WHERE TarifID = $7
    `,

    deleteTariffById: `
        DELETE FROM tarifs WHERE TarifID = $1
    `
};
