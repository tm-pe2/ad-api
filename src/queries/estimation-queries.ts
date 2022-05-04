export const estimationQueries = {
    getAllEstimations: `
        SELECT * FROM estimations
    `,

    getEstimationById: `
        SELECT * FROM estimations WHERE estimated_id = $1
    `,

    addEstimation: `
        INSERT INTO estimations SET $1
    `,

    updateEstimation: `
        UPDATE estimations 
        SET
            service_type = $1,
            adress_id = $2,
            building_type = $3,
            family_size = $4,
            past_consumption = $5,
            electric_car = $6,
            welness = $7,
            heating_type = $8
        WHERE estimated_id = $9
    `,

    deleteEstimationById: `
        DELETE FROM estimations WHERE estimated_id = $1
    `
};
