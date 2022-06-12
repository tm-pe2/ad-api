import { TABLES } from "./tables";

const insertEstimation = `
    INSERT INTO ${TABLES.ESTIMATIONS} (
        service_type,
        building_type,
        family_size,
        equipments,
        past_consumption,
        estimated_consumption
    )
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id
`;

export const estimationQueries = {
    insertEstimation: insertEstimation,
}
