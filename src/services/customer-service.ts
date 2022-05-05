import {execute} from "../utils/mysql.connector";
import {Customer} from "../classes/customer";
import {customerQueries} from "../queries/customer-queries";
import * as userService from "./user-service";

export const getAllCustomers = async () => {
    return execute<Customer[]>(customerQueries.getAllCustomers, [], "rows");
};

export const getCustomerById = async (id: Customer['customer_id']) => {
    const customers = await execute<Customer[]>(customerQueries.getCustomerById, [id], "rows");

    return customers[0];
};

//TODO?
export const getCustomersContracts = async () => {
    return execute<Customer[]>(customerQueries.getCustomersContracts, []);
};

export const insertCustomer = async (customer: Customer) => {
    const rowCount = await execute<number>(customerQueries.AddCustomer, [
        customer.gas_type,
        customer.electricity_type,
        customer.gas_meter_id,
        customer.electricity_meter_id,
        customer.user_id
    ], "rowCount");

    return rowCount > 0;
};

export const UpdateCustomer = async (customer: Customer) => {
    const rowCount = await execute<number>(customerQueries.UpdateCustomer, [
        customer.gas_type,
        customer.electricity_type,
        customer.gas_meter_id,
        customer.electricity_meter_id,
        customer.user_id,

        customer.customer_id
    ], "rowCount");

    const userUpdated = await userService.updateUser(customer)

    return rowCount > 0 || userUpdated;
};

export const deleteCustomer = async (id: Customer['customer_id']) => {
    const rowCount = await execute<number>(customerQueries.DeleteCustomerById, [id], "rowCount");

    return rowCount > 0;
};
