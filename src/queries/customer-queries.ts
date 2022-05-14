export const customerQueries = {
    getAllCustomers: `
        SELECT * FROM users as u 
        INNER JOIN customers c ON u.user_id = c.user_id
        INNER JOIN useraddress ua ON u.user_id = ua.user_id
        INNER JOIN address a ON ua.address_id = a.address_id
    `,

    getCustomerById: `
        SELECT * FROM users as u 
        INNER JOIN customers c ON u.user_id = c.user_id
        INNER JOIN useraddress ua ON u.user_id = ua.user_id
        INNER JOIN address a ON ua.address_id = a.address_id
        WHERE c.customer_id = $1
    `,
    
    getCustomerByUserId: `
        SELECT * FROM users as u
        INNER JOIN customers c ON u.user_id = c.user_id
        INNER JOIN useraddress ua ON u.user_id = ua.user_id
        INNER JOIN address a ON ua.address_id = a.address_id
        WHERE u.user_id = $1
    `,

    getCustomersContracts:`
        SELECT u.user_id, u.first_name, u.last_name, c.customer_type, u.role_id, cc.contract_id FROM users as u 
        INNER JOIN customers c ON u.user_id = c.user_id
        LEFT JOIN customercontracts as cc ON c.customer_id = cc.customer_id
    `,

    getCustomersContractsByID:`
        SELECT * FROM contracts c
        INNER JOIN customercontracts cc
        ON c.contract_id = cc.contract_id
        WHERE cc.customer_id = $1
    `,

    AddCustomer: `
        INSERT INTO customers (user_id, customer_type) VALUES ($1, $2)
    `,

    updateCustomer: `
        UPDATE customers
        SET
            user_id = $1,
            customer_type = $2
        WHERE customer_id = $3
    `,

    DeleteCustomerById: `
        DELETE FROM customers WHERE customer_id = $1 RETURNING user_id
    `
};
