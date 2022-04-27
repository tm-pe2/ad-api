export const customerQueries = {
    getAllCustomers: `
        SELECT * FROM users as u INNER JOIN customers c WHERE u.UserID = c.CustomerID
    `,

    getCustomerById: `
    SELECT * FROM users as u INNER JOIN customers c WHERE u.UserID = c.CustomerID AND u.UserID = $1
    `,

    getCustomersContracts:`
        SELECT u.UserID, u.FirstName, u.LastName, u.RoleID, c.ContractID FROM users as u LEFT JOIN customercontracts as c ON u.UserID = c.CustomerID
    `,

    AddCustomer: `
        INSERT INTO customers SET $1
    `,

    UpdateCustomer: `
        UPDATE customers 
        SET 
            GasType = $1,
            Electricitytype = $2
        WHERE CustomerID = $3
    `,

    DeleteCustomerById: `
    DELETE FROM customers WHERE CustomerID = $1
    `
};
