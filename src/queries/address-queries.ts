export const addressQueries = {
    getAllAddresses: `
        SELECT * FROM address
    `,

    getAddressById: `
        SELECT * FROM address WHERE address_id = $1
    `,

    getAddressByDetails:`
        SELECT address_id FROM address 
        WHERE city = $1 AND street = $2 AND house_number = $3 
        AND postal_code = $4 AND country = $5
    `,

    addAddress: `
        INSERT INTO address (street,house_number,city_id,country)
            VALUES ($1, $2, $3, $4, $5)
        RETURNING address_id
    `,

    updateAddress: `
        UPDATE address 
        SET 
            city = $1,
            street = $2,
            house_number = $3,
            postal_code = $4,
            country = $5,
        WHERE address_id = $6
    `,

    deleteAddressById: `
        DELETE FROM address WHERE address_id = $1
    `,
    getCityIDByPostalCode: `
        SELECT city_id FROM city WHERE postal_code = $1
    `
};
