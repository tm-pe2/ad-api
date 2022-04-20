export const userQueries = {
    getAllUsers: `
        SELECT * FROM users
    `,

    getUserById: `
        SELECT * FROM users WHERE UserID = ?
    `,

    getUserByEmail: `
        SELECT * FROM users WHERE Email = ? 
    `,

    getLastID: `
        SELECT UserID from users ORDER BY UserID DESC LIMIT 1 
    `,

    AddUser: `
        INSERT INTO users SET ?
    `,

    UpdateUser: `
        UPDATE users 
        SET 
            RoleID = ?,
            FirstName = ?,
            LastName = ?,
            BirthDate = ?,
            AddressID = ?,
            Email = ?,
            PhoneNumber = ?,
            Password = ?
        WHERE UserID = ?
    `,

    DeleteUserById: `
    DELETE FROM users WHERE UserID = ?
    `
};
