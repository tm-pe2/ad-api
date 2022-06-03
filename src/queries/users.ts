// select user rows, user addresses as an array, user roles as an array by id
const getUserById = `
        SELECT 
            user.id,
            user.first_name,
            user.last_name,
            user.birth_date,
            user.email,
            user.password,
            user.phone_number,
            user.national_registry_number,
            array_agg(addresses.id) as addresses,
            array_agg(roles.id) as roles
        FROM users
        LEFT JOIN user_addresses ON user.id = user_addresses.user_id
        LEFT JOIN addresses ON user_address.address_id = addresses.id
        LEFT JOIN users_roles ON user.id = users_roles.user_id
        LEFT JOIN roles ON users_roles.role_id = roles.id
        WHERE user.id = $1
        GROUP BY user.id
    `;

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
const addUserAddress = `
    INSERT INTO users_addresses (user_id, address_id) VALUES($1, $2)
    `
const AddCustomer = `
    INSERT INTO customers (user_id, type_id) VALUES ($1, $2)
    `

const AddUser = `
        INSERT INTO users (first_name, last_name, birth_date, email, password, phone_number ,national_registry_number) 
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id
    `
const InsertUserRole = `
    INSERT INTO users_roles (user_id, role_id) VALUES ($1, $2)
    `


export const userQueries = {
    getUserById: getUserById,
    getUserAuthInfoById: getUserAuthInfoById,
    getUserAuthInfoByEmail: getUserAuthInfoByEmail,
    AddUserAddress: addUserAddress,
    AddCustomer: AddCustomer,
    AddUser: AddUser,
    InsertUserRole: InsertUserRole

};
