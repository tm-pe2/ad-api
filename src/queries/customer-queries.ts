export const customerQueries = {
    getAllCustomers: `
        SELECT * FROM users as u INNER JOIN customers c WHERE u.UserID = c.CustomerID
    `,

    getCustomerById: `
    SELECT * FROM users as u INNER JOIN customers c WHERE u.UserID = c.CustomerID AND u.UserID = ?
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
