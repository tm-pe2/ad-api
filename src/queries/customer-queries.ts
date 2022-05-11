export const customerQueries = {
    getAllCustomers: `
        SELECT * FROM users as u 
        INNER JOIN customers c ON u.user_id = c.user_id
        INNER JOIN address a ON u.address_id = a.address_id
    `,

    getCustomerById: `
        SELECT * FROM users as u 
        INNER JOIN customers c ON u.user_id = c.user_id
        INNER JOIN address a ON u.address_id = a.address_id
        WHERE c.customer_id = $1
    `,
    
    getCustomerByUserId: `
        SELECT * FROM customers WHERE user_id = $1
    `,

    getCustomersContracts:`
        SELECT u.user_id, u.first_name, u.last_name, u.role_id, c.contract_id 
        FROM users as u LEFT JOIN customercontracts as c ON u.user_id = c.customer_id
    `,

    getCustomersContractsByID:`
        SELECT * FROM customercontracts cc
        INNER JOIN customers c
        ON cc.customer_id = c.customer_id
        WHERE cc.customer_id  = $1
    `,

    getAddressIdByCustomerID:`
        SELECT u.address_id FROM users u
        INNER JOIN customers c
        ON u.user_id = c.user_id
        WHERE c.customer_id = $
    `,

    AddCustomer: `
        INSERT INTO customers VALUES (NEXTVAL('"Customers_CustomerID_seq"'::regclass), $1, $2, $3, $4, $5)
    `,

    UpdateCustomer: `
        UPDATE customers 
        SET 
            gas_type = $1,
            electricity_type = $2
            gas_meter_id = $3
            electricity_meter_id = $4
        WHERE customer_id = $5
    `,

    DeleteCustomerById: `
        DELETE FROM customers WHERE customer_id = $1 RETURNING user_id
    `
};
