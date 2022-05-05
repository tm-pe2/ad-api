export const userQueries = {
    getAllUsers: `
        SELECT * FROM users
    `,

    getUserById: `
        SELECT * FROM users WHERE user_id = $1
    `,

    getUserByEmail: `
        SELECT * FROM users WHERE email = $1 
    `,

    getLastID: `
        SELECT user_id from users ORDER BY user_id DESC LIMIT 1 
    `,

    AddUser: `
        INSERT INTO users VALUES (NEXTVAL('users_userid_seq'::regclass), $1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING user_id
    `,

    UpdateUser: `
        UPDATE users 
        SET 
            role_id = $1,
            first_name = $2,
            last_name = $3,
            birth_date = $4,
            address_id = $5,
            email = $6,
            phone_number = $7,
            password = $8
        WHERE user_id = $9
    `,

    DeleteUserById: `
    DELETE FROM users WHERE user_id = $1
    `
};
