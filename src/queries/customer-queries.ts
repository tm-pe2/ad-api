export const customerQueries = {
    getAllCustomers: `
        SELECT * FROM users as u 
            INNER JOIN customers c ON u.user_id = c.user_id
    `,

    getCustomerById: `
        SELECT * FROM customers c
            INNER JOIN users u ON u.user_id = c.user_id
        WHERE c.customer_id = $1
    `,

    getCustomersContracts:`
        SELECT u.user_id, u.first_name, u.last_name, u.role_id, c.contract_id FROM users as u 
            LEFT JOIN customercontracts as c ON u.user_id = c.customer_id
    `,

    AddCustomer: `
        INSERT INTO customers (gas_type, electricity_type, gas_meter_id, electricity_meter_id, user_id) 
            VALUES ($1, $2, $3, $4, $5)
    `,

    UpdateCustomer: `
        UPDATE customers 
        SET 
            gas_type = $1,
            electricity_type = $2,
            gas_meter_id = $3,
            electricity_meter_id = $4,
            user_id = $5
        WHERE customer_id = $6
    `,

    DeleteCustomerById: `
    DELETE FROM customers WHERE customer_id = $1
    `
};
