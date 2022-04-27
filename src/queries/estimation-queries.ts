export const estimationQueries = {
    getAllEstimations: `
        SELECT * FROM estimations
    `,

    getEstimationById: `
        SELECT * FROM estimations WHERE EstimatedID = $1
    `,

    addEstimation: `
        INSERT INTO estimations SET $1
    `,

    updateEstimation: `
        UPDATE estimations 
        SET
            ServiceType = $1,
            AdressID = $2,
            BuildingType = $3,
            FamilySize = $4,
            PastConsumption = $5,
            ElectricCar = $6,
            Welness = $7,
            HeatingType = $8
        WHERE EstimatedID = $9
    `,

    deleteEstimationById: `
        DELETE FROM estimations WHERE EstimatedID = $1
    `
};
