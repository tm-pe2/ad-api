// get employee by id
// add fields for corresponding user to the result
const selectEmployeeQuery = `
    SELECT
    u.id,
    e.hire_date,
    e.salary,
    u.first_name,
    u.last_name,
    u.birth_date,
    u.email,
    u.phone_number,
    u.national_registry_number,
    json_agg(
        json_build_object(
            'id', a.id,
            'street', a.street,
            'house_number', a.house_number,
            'city_name', c.city_name,
            'postal_code', c.postal_code,
            'country', a.country
        )
    ) as addresses,
    array_agg(r.id) as roles
    FROM employees as e
    JOIN users as u ON e.user_id = u.id
    JOIN users_addresses as ua ON u.id = ua.user_id
    JOIN addresses as a ON ua.address_id = a.id
    JOIN users_roles as ur ON u.id = ur.user_id
    JOIN roles as r ON ur.role_id = r.id
    JOIN cities_postalcodes as c ON a.city_id = c.id
`



const insertEmployee = `
    INSERT INTO employees (user_id, hire_date, salary) VALUES ($1, $2, $3)
`


//modify employee
const modifyEmployee = `
    UPDATE employees SET salary = $2 WHERE user_id = $1;
`
const modifyUser = `
    UPDATE users SET first_name = $2, last_name = $3, birth_date = $4, email = $5, phone_number = $6, national_registry_number = $7, password = $8 WHERE id = $1;
   
`
const modifyUserRoles = `
    UPDATE users_roles SET role_id = $2 WHERE user_id = $1;
`
const modifyAddress = `
    UPDATE addresses SET street = $2, house_number = $3, city_id = $4, country = $5 WHERE id = (SELECT address_id FROM users_addresses WHERE user_id = $1);
`
export const employeeQueries = {
    insertEmployee: insertEmployee,
    
    getAllEmployees: selectEmployeeQuery + `
        GROUP BY u.id, e.hire_date, e.salary
    `,

    getEmployeeById: selectEmployeeQuery + `
        WHERE e.user_id = $1
        GROUP BY u.id, u.first_name, u.last_name, u.birth_date, u.email, u.phone_number, u.national_registry_number, e.hire_date, e.salary;
    `,

    modifyEmployee: modifyEmployee,
    modifyUser: modifyUser,
    modifyUserRoles: modifyUserRoles,
    modifyAddress: modifyAddress
}