export const addressQueries = {
    getAllAddresses: `
        SELECT * FROM address
    `,

    getAddressById: `
        SELECT * FROM address WHERE address_id = $1
    `,

    addAddress: `
        INSERT INTO address (city, street, house_number, postal_code, country, start_date, end_date)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
    `,

    updateAddress: `
        UPDATE address 
        SET 
            city = $1,
            street = $2,
            house_number = $3,
            postal_code = $4,
            country = $5,
            start_date = $6,
            end_date = $7
        WHERE address_id = $8
    `,

    deleteAddressById: `
        DELETE FROM address WHERE address_id = $1
    `
};
