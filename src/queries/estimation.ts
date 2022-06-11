import { TABLES } from "./tables";

const getAllEstimations = `
    SELECT
        e.id,
        e.past_consumption,
        e.estimated_consumption,
        json_build_object(
            'id', a.id,
            'street', a.street,
            'house_number', a.house_number,
            'city_name', c.city_name,
            'postal_code', c.postal_code,
            'country', a.country
        ) as address
    FROM ${TABLES.ESTIMATIONS} as e
    LEFT JOIN ${TABLES.ADDRESSES} as a ON e.address_id = a.id
    LEFT JOIN ${TABLES.CITIES} as c ON a.city_id = c.id
    LEFT JOIN ${TABLES.USERS_ADDRESSES} as ua ON a.id = ua.address_id
    LEFT JOIN ${TABLES.USERS} as u ON ua.user_id = u.id
`;

const insertEstimation = `
    INSERT INTO ${TABLES.ESTIMATIONS} (
        service_type,
        building_type,
        address_id,
        family_size,
        equipments,
        past_consumption,
        estimated_consumption
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id
`;

export const estimationQueries = {
    getAllEstimations: getAllEstimations,
    insertEstimation: insertEstimation,
}
