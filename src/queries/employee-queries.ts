export const employeeQueries = {
    getAllEmployees: `
        SELECT * FROM users AS u INNER JOIN employees AS e ON u.user_id = e.employee_id
    `,

    getEmployeeById: `
        SELECT * FROM users as u INNER JOIN employees e ON u.user_id = e.employee_id WHERE u.user_id = $1
    `,
    addEmployee: `
        INSERT INTO employees SET $1
    `,

    updateEmployees: `
        UPDATE employees 
        SET 
            departement = $1,
            permissions = $2,
            hire_date = $3,
            gender = $4,
            salary = $6
        WHERE employee_id = $5
    `,

    deleteEmployeeById: `
        DELETE FROM employees WHERE employee_id = $1
    `
};
