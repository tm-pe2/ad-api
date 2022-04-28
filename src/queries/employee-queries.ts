export const employeeQueries = {
    getAllEmployees: `
        SELECT * FROM users as u 
        INNER JOIN employees e ON u.UserID = e.EmployeeID
    `,

    getEmployeeById: `
        SELECT * FROM users as u 
        INNER JOIN employees e ON u.UserID = e.EmployeeID 
        Where u.UserID = ?
    `,
    addEmployee: `
        INSERT INTO employees SET ?
    `,

    updateEmployees: `
        UPDATE employees 
        SET 
            Departement = ?,
            Permissions = ?,
            HireDate = ?,
            Gender = ?
        WHERE EmployeeID = ?
    `,

    deleteEmployeeById: `
        DELETE FROM employees WHERE EmployeeID = ?
    `
};
