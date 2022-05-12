export const estimationQueries = {
    getAllEstimations: `
        SELECT * FROM estimations
    `,

    getEstimationById: `
        SELECT * FROM estimations WHERE estimation_id = $1
    `,

    addEstimation: `
        INSERT INTO estimations (service_type, address_id, building_type, family_size, past_consumption, electric_car, wellness, heating_type)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `,

    updateEstimation: `
        UPDATE estimations 
        SET
            service_type = $1,
            address_id = $2,
            building_type = $3,
            family_size = $4,
            past_consumption = $5,
            electric_car = $6,
            wellness = $7,
            heating_type = $8
        WHERE estimation_id = $9
    `,

    deleteEstimationById: `
        DELETE FROM estimations WHERE estimation_id = $1
    `
};
