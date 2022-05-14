import {execute} from "../utils/mysql.connector";
import {Customer} from "../classes/customer";
import {customerQueries} from "../queries/customer-queries";
import * as userService from "./user-service";
import { Contract } from "../classes/contracts";

export const getAllCustomers = async () => {
    return execute<Customer[]>(customerQueries.getAllCustomers, [], "rows");
};

export const getCustomerById = async (id: Customer['customer_id']) => {
    const customers = await execute<Customer[]>(customerQueries.getCustomerById, [id], "rows");
    return customers[0];
};

export const getCustomerByUserId = async (id: Customer['user_id']) => {
    const customers = await execute<Customer[]>(customerQueries.getCustomerByUserId, [id], "rows");
    return customers[0];
};

// export const getAddressIdByCustomerId = async (id: Customer['customer_id']) => {
//     const addressID = await execute<number[]>(customerQueries.getAddressIdByCustomerID, [id], "rows");
//     return addressID[0];
// };

//TODO?
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

export const updateCustomer = async (customer: Customer) => {
    const rowCount = await execute<number>(customerQueries.updateCustomer, [
        customer.user_id,
        customer.customer_type,
        customer.customer_id
    ], "rowCount");

    const userUpdated = await userService.updateUser(customer)

    return rowCount > 0 || userUpdated;
};

export const deleteCustomer = async (id: Customer['customer_id']) => {
    const rowCount = await execute<number>(customerQueries.DeleteCustomerById, [id], "rowCount");
    return rowCount;
};