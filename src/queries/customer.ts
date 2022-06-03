// Edit this query for addresses with new DB
// array_agg(tag_id) as tag_arr for roles later
// https://stackoverflow.com/questions/31453151/in-postgres-select-return-a-column-subquery-as-an-array

const selectCustomerQuery = `
        SELECT 
            users.id,
            users.first_name,
            users.last_name,
            users.birth_date,
            users.email,
            users.password,
            users.phone_number,
            users.national_registry_number,
            json_agg(
                json_build_object(
                    'id', addresses.id, 
                    'street', addresses.street,
                    'house_number', addresses.house_number, 
                    'city_name',cities_postalcodes.city_name, 
                    'postal_code',cities_postalcodes.postal_code, 
                    'country',addresses.country)
                ) as addresses,
            array_agg(roles.id) as roles
        FROM users
        JOIN users_addresses ON users.id = users_addresses.user_id
        JOIN addresses ON users_addresses.address_id = addresses.id
        JOIN users_roles ON users.id = users_roles.user_id
        JOIN roles ON users_roles.role_id = roles.id
        JOIN cities_postalcodes ON addresses.city_id = cities_postalcodes.id
        JOIN customers ON users.id = customers.user_id
`;

export const customerQueries = {
    getAllCustomers: selectCustomerQuery + `
        GROUP BY users.id
    `,

    getCustomerById:  selectCustomerQuery + `
        WHERE users.id = $1
        GROUP BY users.id
    `,
};
