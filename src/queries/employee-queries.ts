export const employeeQueries = {
    getAllEmployees: `
        SELECT * FROM users as u 
        INNER JOIN employees as e ON u.user_id = e.user_id
        INNER JOIN useraddress as ua ON u.user_id = ua.user_id       
        INNER JOIN address a ON a.address_id = ua.address_id
    `,

    getEmployeeById: `
        SELECT * FROM users as u 
        INNER JOIN employees as e ON u.user_id = e.user_id
        INNER JOIN useraddress as ua ON u.user_id = ua.user_id       
        INNER JOIN address a ON a.address_id = ua.address_id
        WHERE e.employee_id = $1
    `,

    addEmployee: `
        INSERT INTO employees (department, permissions, hire_date, gender, salary, user_id)
            VALUES ($1, $2, $3, $4, $5, $6)
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
