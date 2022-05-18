import {execute} from "../utils/mysql.connector";
import {Customer} from "../classes/customer";
import {customerQueries} from "../queries/customer-queries";
import * as userServices from './user-service';
import {userSchema} from '../classes/user';
import { displayvideo_v1dev } from "googleapis";

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

export const getCustomerIdByAddressId = async (id: number) => {
    const customers = await execute<Customer[]>(customerQueries.getCustomerById, [id], "rows");
    return customers[0].customer_id;
};

export const insertCustomer = async (customer: Customer) => {
    const rowCount = await execute<number>(customerQueries.AddCustomer, [
        customer.user_id,
        customer.customer_type,
    ], "rowCount");

    return rowCount > 0;
};

export const updateCustomer = async (customer: Customer) => {
    const forkedSchema =  userSchema.fork(['address_id'], field => field.optional());
    const validatedUser = await forkedSchema.validateAsync(customer);
    const res = await userServices.updateUser(validatedUser);
    if(res)
    {
        const rowCount = await execute<number>(customerQueries.updateCustomer, [
            customer.customer_type,
            customer.customer_id
        ], "rowCount");
    
        return rowCount;
    }
};

export const deleteCustomer = async (id: Customer['customer_id']) => {
    const rowCount = await execute<number>(customerQueries.DeleteCustomerById, [id], "rowCount");
    return rowCount;
};