export const customerQueries = {
    getAllCustomers: `
        SELECT * FROM customers
    `,

    getCustomerById: `
        SELECT * FROM customers WHERE CustomerID = ?
    `,

    getCustomerByEmail: `
        SELECT * FROM customers WHERE Email = ? 
    `,

    AddCustomer: `
        INSERT INTO customers SET ?
    `,

    UpdateCustomer: `
        UPDATE customers 
        SET 
            FirstName = ?,
            LastName = ?,
            BirthDate = ?,
            AdressID = ?,
            Email = ?,
            PhoneNumber = ?,
            Password = ?,
            GasType = ?,
            Electricitytype = ?
        WHERE CustomerID = ?
    `,

    DeleteCustomerById: `
    DELETE FROM customers WHERE CustomerID = ?
    `
};
