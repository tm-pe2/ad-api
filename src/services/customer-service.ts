import {execute} from "../utils/mysql.connector";
import {Customer} from "../classes/customer";
import {customerQueries} from "../queries/customer-queries";

export const getAllCustomers = async () => {
    return execute<Customer[]>(customerQueries.getAllCustomers, []);
};

export const getCustomerById = async (id: Customer['customer_id']) => {
    return execute<Customer>(customerQueries.getCustomerById, [id]);
};

export const getCustomersContracts = async () => {
    return execute<Customer[]>(customerQueries.getCustomersContracts, []);
};

export const insertCustomer = async (customer: Customer) => {
    const result = await execute<{ rowCount: number }>(customerQueries.AddCustomer, [
        customer.gas_type,
        customer.electricity_type,
        customer.gas_meter_id,
        customer.electricity_meter_id,
        customer.user_id
    ]);
    return result.rowCount > 0;
};

export const UpdateCustomer = async (customer: Customer) => {
    const result = await execute<{ rowCount: number }>(customerQueries.UpdateCustomer, [
        customer.gas_type,
        customer.electricity_type,
        customer.gas_meter_id,
        customer.electricity_meter_id,
        customer.user_id,

        customer.customer_id
    ]);
    return result.rowCount > 0;
};

export const deleteCustomer = async (id: Customer['customer_id']) => {
    const result = await execute<{ rowCount: number }>(customerQueries.DeleteCustomerById, [
        id
    ]);
    return result.rowCount > 0;
};
