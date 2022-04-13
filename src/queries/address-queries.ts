export const addressQueries = {
    getAllAddresses: `
        SELECT * FROM adress
    `,

    getAddressById: `
        SELECT * FROM adress WHERE AdressID = ?
    `,

    addAddress: `
        INSERT INTO adress SET ?
    `,

    updateAddress: `
        UPDATE adress 
        SET 
            City = ?,
            Street = ?,
            HouseNumber = ?,
            PostalCode = ?,
            Country = ?,
            StartDate = ?,
            EndDate = ?
        WHERE AdressID = ?
    `,

    deleteAddressById: `
        DELETE FROM adress WHERE AdressID = ?
    `
};
