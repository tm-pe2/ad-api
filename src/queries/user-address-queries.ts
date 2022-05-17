export const userAdressQueries = {
    getAllUserAddresses: `
        SELECT * FROM useraddress
    `,

    getAddressIdByUserId: `
        SELECT * FROM useraddress WHERE user_id = $1
    `,

    addUserAddress: `
        INSERT INTO useraddress (user_id, address_id) VALUES($1, $2)
    `,

    updateUserAddress: `
        UPDATE useraddress
        SET
            user_id = $1,
            address_id = $2
        WHERE user_id = $3 AND address_id = $4
    `,

    deleteUserAddress: `
        DELETE FROM useraddress WHERE address_id = $1
    `
}