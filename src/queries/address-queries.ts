export const addressQueries = {
    getAllAddresses: `
        SELECT * FROM address
    `,

    getAddressById: `
        SELECT * FROM address WHERE address.address_id = $1
    `,

    addAddress: `
        INSERT INTO address SET $1
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
