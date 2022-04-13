export const estimationQueries = {
    getAllEstimations: `
        SELECT * FROM estimations
    `,

    getEstimationById: `
        SELECT * FROM estimations WHERE EstimatedID = ?
    `,

    addEstimation: `
        INSERT INTO estimations SET ?
    `,

    updateEstimation: `
        UPDATE estimations 
        SET
            ServiceType = ?,
            AdressID = ?,
            BuildingType = ?,
            FamilySize = ?,
            PastConsumption = ?,
            ElectricCar = ?,
            Welness = ?,
            HeatingType = ?
        WHERE EstimatedID = ?
    `,

    deleteEstimationById: `
        DELETE FROM estimations WHERE EstimatedID = ?
    `
};
