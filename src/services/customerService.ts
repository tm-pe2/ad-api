/** source/controllers/clients.ts */
import {execute} from "../utils/mysql.connector";
import {Customer} from "../classes/customer";
import {CustomerQueries} from "../queries/customerQueries";

/**
 * gets all customers
 */
export const getAllCustomers = async () => {
    return execute<Customer[]>(CustomerQueries.getAllCustomers, []);
};

/**
 * gets a customer based on id
 */
export const getCustomerById = async (id: Customer['ClientID']) => {
    return execute<Customer>(CustomerQueries.getCustomerById, [id]);
};

/**
 * adds a new customer
 */
export const insertCustomer = async (customer: Customer) => {
    const result = await execute<{ affectedRows: number }>(CustomerQueries.AddCustomer, [
        customer
    ]);
    return result.affectedRows > 0;
};

/**
 * updates a customer
 */
export const UpdateCustomer = async (customer: Customer) => {
    const result = await execute<{ affectedRows: number }>(CustomerQueries.UpdateCustomer, [
        customer.getFirstName,
        customer.getLastName,
        customer.getBirthDate,
        customer.getAdressID,
        customer.getEmail,
        customer.getPhoneNumber,
        customer.getPassword,
        customer.getClientID
    ]);
    return result.affectedRows > 0;
};

/**
 * deletes a customer
 */
export const deleteCustomer = async (id: Customer['ClientID']) => {
    const result = await execute<{ affectedRows: number }>(CustomerQueries.DeleteCustomerById, [
        id
    ]);
    return result.affectedRows > 0;
};
