export const addressQueries = {
    getAddressesByUserId: `
    SELECT *
    FROM address as a
    INNER JOIN useraddress as ua
    ON a.address_id = ua.address_id
    WHERE ua.user_id = $1
    `,


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
        INSERT INTO address (city, street, house_number, postal_code, country)
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
    `
};
