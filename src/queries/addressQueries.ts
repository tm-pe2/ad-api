export const AddressQueries = {
    getAllAddresses: `
    SELECT * FROM address
    `,

    getAddressById: `
    SELECT * FROM address WHERE AdressID = ?
    `,

    addAddress: `
    INSERT INTO address SET ?
    `,

    updateAddress: `
    UPDATE address 
    SET 
        City = ?,
        Street = ?,
        HouseNumber = ?,
        PostalCode = ?,
        Country = ? 
    WHERE AdressID = ?
    `,

    deleteAddressById: `
    DELETE FROM address WHERE AdressID = ?
    `
};
