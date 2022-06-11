import { TABLES } from "./tables";

const getAllEstimations = `
    SELECT
        id,
        past_consumption,
        estimated_consumption,
        json_build_object(
            'id', addresses.id,
            'street', addresses.street,
            'house_number', addresses.house_number,
            'city_name', cities_postalcodes.city_name,
            'postal_code', cities_postalcodes.postal_code,
            'country', addresses.country
        ) as address
    FROM ${TABLES.ESTIMATIONS} as e
    LEFT JOIN addresses ON e.address_id = addresses.id
    LEFT JOIN cities_postalcodes ON addresses.city_id = cities_postalcodes.id
`;

const insertEstimation = `
    INSERT INTO ${TABLES.ESTIMATIONS} (
        address_id,
        past_consumption,
        estimated_consumption,
`;

export const estimationQueries = {
    getAllEstimations: getAllEstimations,
    insertEstimation: insertEstimation,
}
