const getUserById = ``; // TODO

const getUserAuthInfo = `
    SELECT
        u.id,
        u.email,
        u.password,
        array_agg(r.id) as roles
    FROM users as u
    JOIN users_roles as ur ON u.id = ur.user_id
    JOIN roles as r ON ur.role_id = r.id`


const getUserAuthInfoById = getUserAuthInfo + `
    WHERE u.user_id = $1
    GROUP BY u.id, u.email`

const getUserAuthInfoByEmail = getUserAuthInfo + `
    WHERE u.email = $1
    GROUP BY u.id, u.email`


export const userQueries = {
    getUserById: getUserById,
    getUserAuthInfoById: getUserAuthInfoById,
    getUserAuthInfoByEmail: getUserAuthInfoByEmail

};
