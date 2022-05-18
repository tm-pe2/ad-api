export const userQueries = {
    getAllUsers: `
        SELECT * FROM users as u 
        INNER JOIN useraddress ua ON u.user_id = ua.user_id
        INNER JOIN address a ON ua.address_id = a.address_id
    `,

    getUserById: `
        SELECT * FROM users WHERE user_id = $1
    `,

    getUserByEmail: `
        SELECT * FROM users WHERE email = $1
    `,

    getUserByNationalNumber: `
        SELECT * FROM users WHERE national_registry_number = $1
    `,

    getLastID: `
        SELECT user_id from users ORDER BY user_id DESC LIMIT 1 
    `,

    AddUser: `
        INSERT INTO users (role_id, first_name, last_name, birth_date, email, phone_number, password, national_registry_number) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING user_id
    `,

    UpdateUser: `
        UPDATE users 
        SET 
            role_id = $1,
            first_name = $2,
            last_name = $3,
            birth_date = $4,
            email = $5,
            phone_number = $6,
            password = $7
        WHERE user_id = $8
    `,

    DeleteUserById: `
    DELETE FROM users WHERE user_id = $1
    `
};
