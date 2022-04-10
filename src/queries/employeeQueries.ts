export const EmployeeQueries = {
    getAllEmployees: `
    SELECT * FROM Employees
    `,

    getEmployeeById: `
    SELECT * FROM Employees WHERE EmployeeID = ?
    `,

    addEmployee: `
    INSERT INTO Employees SET ?
    `,

    updateEmployees: `
    UPDATE employee 
    SET 
        FirstName = ?,
        LastName = ?,
        BirthDate = ?,
        AdressID = ?,
        Email = ?,
        PhoneNumber = ?,
        Password = ?,
        Departement = ?,
        HireDate = ?,
        Gender = ?,
        Permissions = ?
    WHERE EmployeeID = ?
    `,

    deleteEmployeeById: `
    DELETE FROM Employees WHERE EmployeeID = ?
    `
};
