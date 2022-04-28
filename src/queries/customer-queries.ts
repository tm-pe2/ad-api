export const customerQueries = {
    getAllCustomers: `
        SELECT * FROM users as u 
        INNER JOIN customers c ON u.UserID = c.CustomerID
    `,

    getCustomerById: `
    SELECT * FROM users as u 
    INNER JOIN customers c ON u.UserID = c.CustomerID 
    WHERE u.UserID = ?
    `,

    getCustomersContracts:`
        SELECT u.UserID, u.FirstName, u.LastName, u.RoleID, c.ContractID FROM users as u 
        LEFT JOIN customercontracts as c ON u.UserID = c.CustomerID
    `,

    AddCustomer: `
        INSERT INTO customers SET ?
    `,

    UpdateCustomer: `
        UPDATE customers 
        SET 
            GasType = ?,
            Electricitytype = ?
        WHERE CustomerID = ?
    `,

    DeleteCustomerById: `
    DELETE FROM customers WHERE CustomerID = ?
    `
};
