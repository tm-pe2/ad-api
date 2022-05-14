export const estimationQueries = {
    getAllEstimations: `
        SELECT * FROM estimations
    `,

    getEstimationById: `
        SELECT * FROM estimations WHERE estimation_id = $1
    `,

    getEstimationByCustomerID: `
        SELECT * FROM estimations as e
        INNER JOIN customercontracts as cs
        ON e.estimation_id = cs.estimation_id
        WHERE cs.customer_id = $1
    `,

    addEstimation: `
        INSERT INTO estimations (service_type, address_id, building_type, family_size, past_consumption, equipments, estimated_consumption)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
    `,

    updateEstimation: `
        UPDATE estimations 
        SET
            service_type = $1,
            address_id = $2,
            building_type = $3,
            family_size = $4,
            past_consumption = $5,
            equipments = $6,
            estimated_consumption = $7,
        WHERE estimation_id = $8
    `,

    deleteEstimationById: `
        DELETE FROM estimations WHERE estimation_id = $1
    `
};
