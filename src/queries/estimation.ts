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

const selectEstimation = `
    SELECT 
        est.id,
        est.past_consumption,
        est.estimated_consumption,
        json_build_object(
            'id', a.id,
            'street', a.street,
            'house_number', a.house_number,
            'city_name', ci.city_name,
            'postal_code', ci.postal_code,
            'country', a.country
        ) as address
    FROM ${TABLES.ESTIMATIONS} as est
    LEFT JOIN ${TABLES.CONTRACTS} as c ON c.id = est.id
    LEFT JOIN ${TABLES.ADDRESSES} as a ON c.address_id = a.id
    LEFT JOIN ${TABLES.CITIES} as ci ON a.city_id = ci.id
`;

export const estimationQueries = {
    insertEstimation: insertEstimation,
    getEstimationById: selectEstimation + `
        WHERE est.id = $1;
    `
}
