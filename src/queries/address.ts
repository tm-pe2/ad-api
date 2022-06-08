export const addressQueries = {
    addAddress: `
        INSERT INTO addresses (street,house_number,city_id,country)
            VALUES ($1, $2, $3, $4)
        RETURNING id
    `,

    getCityIDByPostalCode: `
        SELECT id FROM cities_postalcodes WHERE postal_code = $1
    `
};
