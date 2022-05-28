import {execute} from "../utils/database-connector";
import {Customer} from "../classes/customer";
import {customerQueries} from "../queries/customer-queries";

export const getAllCustomers = async () => {
    return execute<Customer[]>(customerQueries.getAllCustomers, [], "rows");
};

export const getCustomerById = async (id: Customer['customer_id']) => {
    const customers = await execute<Customer[]>(customerQueries.getCustomerById, [id], "rows");
    return customers[0];
};

export const getCustomerByUserId = async (id: Customer['user_id']) => {
    const customers = await execute<Customer[]>(customerQueries.getCustomerByUserId, [id], "rows");
    return customers;
};

export const getCustomersContracts = async () => {
    return execute<Customer[]>(customerQueries.getCustomersContracts, [], "rows");
};

export const getCustomersContractsByID = async (id: Customer['customer_id']) => {
    return execute<Customer[]>(customerQueries.getCustomersContractsByID, [id], "rows");
};

export const insertCustomer = async (customer: Customer) => {
    const rowCount = await execute<number>(customerQueries.AddCustomer, [
        customer.user_id,
        customer.customer_type,
    ], "rowCount");

    return rowCount > 0;
};

export const updateCustomer = async (customer_type: Customer['customer_type'],customer_id: Customer['customer_id']) => {
    const rowCount = await execute<number>(customerQueries.updateCustomer, [
        customer_type,
        customer_id
    ], "rowCount");

    return rowCount;
};

export const deleteCustomer = async (id: Customer['customer_id']) => {
    const rowCount = await execute<number>(customerQueries.DeleteCustomerById, [id], "rowCount");
    return rowCount;
};
