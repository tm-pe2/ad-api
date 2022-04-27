export const userQueries = {
    getAllUsers: `
        SELECT * FROM users
    `,

    getUserById: `
        SELECT * FROM users WHERE UserID = $1
    `,

    getUserByEmail: `
        SELECT * FROM users WHERE Email = $1 
    `,

    getLastID: `
        SELECT UserID from users ORDER BY UserID DESC LIMIT 1 
    `,

    AddUser: `
        INSERT INTO users SET $1
    `,

    UpdateUser: `
        UPDATE users 
        SET 
            RoleID = $1,
            FirstName = $2,
            LastName = $3,
            BirthDate = $4,
            AddressID = $5,
            Email = $6,
            PhoneNumber = $7,
            Password = $8
        WHERE UserID = $9
    `,

    DeleteUserById: `
    DELETE FROM users WHERE UserID = $1
    `
};
