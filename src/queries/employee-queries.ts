export const employeeQueries = {
    getAllEmployees: `
        SELECT * FROM users as u INNER JOIN employees e WHERE u.UserID = e.EmployeeID
    `,

    getEmployeeById: `
        SELECT * FROM users as u INNER JOIN employees e WHERE u.UserID = e.EmployeeID AND u.UserID = $1
    `,
    addEmployee: `
        INSERT INTO employees SET $1
    `,

    updateEmployees: `
        UPDATE employees 
        SET 
            Departement = $1,
            Permissions = $2,
            HireDate = $3,
            Gender = $4
        WHERE EmployeeID = $5
    `,

    deleteEmployeeById: `
        DELETE FROM employees WHERE EmployeeID = $1
    `
};
