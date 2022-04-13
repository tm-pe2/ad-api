export const employeeQueries = {
    getAllEmployees: `
        SELECT * FROM employees
    `,

    getEmployeeById: `
        SELECT * FROM employees WHERE EmployeeID = ?
    `,

    addEmployee: `
        INSERT INTO employees SET ?
    `,

    updateEmployees: `
        UPDATE employees 
        SET 
            FirstName = ?,
            LastName = ?,
            BirthDate = ?,
            AdressID = ?,
            Email = ?,
            PhoneNumber = ?,
            Password = ?,
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
