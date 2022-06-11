import { TABLES } from "./tables";

const selectCustomerQuery = `
        SELECT 
            users.id,
            users.first_name,
            users.last_name,
            users.birth_date,
            users.email,
            users.phone_number,
            users.national_registry_number,
            c.type_id,
            json_agg(
                json_build_object(
                    'id', a.id, 
                    'street', a.street,
                    'house_number', a.house_number, 
                    'city_name',ci.city_name, 
                    'postal_code',ci.postal_code, 
                    'country',a.country)
                ) as a,
            array_agg(r.id) as roles
        FROM ${TABLES.CUSTOMERS} as c
        LEFT JOIN ${TABLES.USERS} as u ON c.user_id = u.id
        LEFT JOIN ${TABLES.USERS_ADDRESSES} as ua ON u.id = ua.user_id
        LEFT JOIN ${TABLES.ADDRESSES} as ON ua.address_id = a.id
        LEFT JOIN ${TABLES.USERS_ROLES} as ur ON u.id = ur.user_id
        LEFT JOIN ${TABLES.ROLES} as r ON ur.role_id = r.id
        LEFT JOIN ${TABLES.CITIES} as ci ON a.city_id = ci.id
`;
const AddCustomer = `
    INSERT INTO ${TABLES.CUSTOMERS} as c (user_id, type_id) VALUES ($1, $2)
    `
export const customerQueries = {
    getAllCustomers: selectCustomerQuery + `
        GROUP BY u.id, c.type_id
    `,

    getCustomerById:  selectCustomerQuery + `
        WHERE u.id = $1
        GROUP BY u.id, c.type_id
    `,
    addCustomer: AddCustomer,
};
