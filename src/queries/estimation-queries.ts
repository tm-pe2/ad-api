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
        INSERT INTO estimations (service_type, address_id, building_type, 
            family_size, past_consumption, meters_number,  meter_type, meter_value,  
            meter_type2,  meter_value2, meter_type3, meter_value3, equipments)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14 )
    `,

    updateEstimation: `
        UPDATE estimations 
        SET
            service_type = $1,
            address_id = $2,
            building_type = $3,
            family_size = $4,
            past_consumption = $5,
            meters_number = $6,
            meter_type = $7,
            meter_value = $8,
            meter_type2 = $9,  
            meter_value2 = $10,
            meter_type3 = $11,
            meter_value3 = $12,
            equipments = $13
        WHERE estimation_id = $14
    `,

    deleteEstimationById: `
        DELETE FROM estimations WHERE estimation_id = $1
    `
};
