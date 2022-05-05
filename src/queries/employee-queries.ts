export const employeeQueries = {
    getAllEmployees: `
        SELECT * FROM users AS u INNER JOIN employees AS e ON u.user_id = e.employee_id
    `,

    getEmployeeById: `
        SELECT * FROM users as u INNER JOIN employees e ON u.user_id = e.employee_id WHERE u.user_id = $1
    `,

    addEmployee: `
        INSERT INTO employees VALUES (nextval('"Employees_EmployeeID_seq"'::regclass), $1, $2, $3, $4, $5, $6)
    `,

    updateEmployees: `
        UPDATE employees 
        SET 
            department = $1,
            permissions = $2,
            hire_date = $3,
            gender = $4,
            salary = $5,
            user_id = $6
        WHERE employee_id = $7
    `,

    deleteEmployeeById: `
        DELETE FROM employees WHERE employee_id = $1
    `
};
