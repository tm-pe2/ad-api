export const customerQueries = {
    getAllCustomers: `
        SELECT * FROM users as u INNER JOIN customers c ON u.user_id = c.customer_id
    `,

    getCustomerById: `
        SELECT * FROM users as u INNER JOIN customers c ON u.user_id = c.customer_id WHERE u.user_id = $1
    `,

    getCustomersContracts:`
        SELECT u.user_id, u.first_name, u.last_name, u.role_id, c.contract_id FROM users as u LEFT JOIN customercontracts as c ON u.user_id = c.customer_id
    `,

    AddCustomer: `
        INSERT INTO customers SET $1
    `,

    UpdateCustomer: `
        UPDATE customers 
        SET 
            gas_type = $1,
            electricity_type = $2
        WHERE customer_id = $3
    `,

    DeleteCustomerById: `
    DELETE FROM customers WHERE customer_id = $1
    `
};
