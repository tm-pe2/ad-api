import { TABLES } from "./tables";

const getUserById = `
    SELECT 
        u.id,
        u.first_name,
        u.last_name,
        u.birth_date,
        u.email,
        u.phone_number,
        u.national_registry_number,
        u.active,
        json_agg(
            json_build_object(
                'id', a.id, 
                'street', a.street,
                'house_number', a.house_number, 
                'city_name', c.city_name, 
                'postal_code', c.postal_code, 
                'country', a.country)
            ) as addresses,
        array_agg(r.id) as roles
    FROM ${TABLES.USERS} as u
    JOIN ${TABLES.USERS_ADDRESSES} as ua ON u.id = ua.user_id
    JOIN ${TABLES.ADDRESSES} as a ON ua.address_id = a.id
    JOIN ${TABLES.USERS_ROLES} as ur ON u.id = ur.user_id
    JOIN ${TABLES.ROLES} as r ON ur.role_id = r.id
    JOIN ${TABLES.CITIES} as c ON a.city_id = c.id
    WHERE u.id = $1
    GROUP BY u.id
`;

const getUserAuthInfo = `
    SELECT
        u.id,
        u.email,
        u.password,
        array_agg(r.id) as roles
    FROM ${TABLES.USERS} as u
    JOIN ${TABLES.USERS_ROLES} as ur ON u.id = ur.user_id
    JOIN roles as r ON ur.role_id = r.id
    `

const getUserAuthInfoById = getUserAuthInfo + `
    WHERE u.active = true AND u.user_id = $1
    GROUP BY u.id, u.email`

const getUserAuthInfoByEmail = getUserAuthInfo + `
    WHERE u.active = true AND u.email = $1
    GROUP BY u.id, u.email`

const addUserAddress = `
    INSERT INTO ${TABLES.USERS_ADDRESSES} (user_id, address_id) VALUES($1, $2)
    `

const AddUser = `
        INSERT INTO ${TABLES.USERS}
        (
            first_name,
            last_name,
            birth_date,
            email,
            password,
            phone_number,
            national_registry_number,
            active
        ) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, true)
        RETURNING id
    `

const InsertUserRole = `
    INSERT INTO users_roles (user_id, role_id) VALUES ($1, $2)
    `
const modifyUser = `
UPDATE ${TABLES.USERS} SET first_name = $2, last_name = $3, birth_date = $4, email = $5, phone_number = $6, national_registry_number = $7, password = COALESCE($8,password) , active = $9 WHERE id = $1;
`
const modifyUserRoles = `
    UPDATE ${TABLES.USERS_ROLES} SET role_id = $2 WHERE user_id = $1;
`

export const userQueries = {
    getUserById: getUserById,
    getUserAuthInfoById: getUserAuthInfoById,
    getUserAuthInfoByEmail: getUserAuthInfoByEmail,
    AddUserAddress: addUserAddress,
    AddUser: AddUser,
    InsertUserRole: InsertUserRole,
    modifyUser: modifyUser,
    modifyUserRoles: modifyUserRoles
};
