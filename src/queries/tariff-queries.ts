export const tariffQueries = {
    getAllTariffs: `
        SELECT * FROM tarifs
    `,

    getTariffById: `
        SELECT * FROM tarifs WHERE TarifID = ?
    `,

    addTariff: `
        INSERT INTO tarifs SET ?
    `,

    updateTariff: `
        UPDATE tarifs 
        SET
            SmallInd = ?,
            MediumInd = ?,
            BigInd = ?,
            SmallComp = ?,
            MediumComp = ?,
            BigComp = ?
        WHERE TarifID = ?
    `,

    deleteTariffById: `
        DELETE FROM tarifs WHERE TarifID = ?
    `
};
