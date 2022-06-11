import { TABLES } from "./tables";

export const addressQueries = {
    addAddress: `
        INSERT INTO ${TABLES.ADDRESSES} (street,house_number,city_id,country)
            VALUES ($1, $2, $3, $4)
        RETURNING id
    `,

    getCityIDByPostalCode: `
        SELECT id FROM ${TABLES.CITIES} WHERE postal_code = $1
    `
};
