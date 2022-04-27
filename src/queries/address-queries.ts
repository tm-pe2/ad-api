export const addressQueries = {
    getAllAddresses: `
        SELECT * FROM adress
    `,

    getAddressById: `
        SELECT * FROM adress WHERE adress.adressid = $1
    `,

    addAddress: `
        INSERT INTO adress SET $1
    `,

    updateAddress: `
        UPDATE adress 
        SET 
            City = $1,
            Street = $2,
            HouseNumber = $3,
            PostalCode = $4,
            Country = $5,
            StartDate = $6,
            EndDate = $7
        WHERE adressid = $8
    `,

    deleteAddressById: `
        DELETE FROM adress WHERE adressid = $1
    `
};
