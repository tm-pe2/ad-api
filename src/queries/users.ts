const getUserById = `
    SELECT * FROM users WHERE id = $1
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
