import {execute} from "../utils/mysql.connector";
import {Customer} from "../classes/customer";
import {customerQueries} from "../queries/customer-queries";

export const getAllCustomers = async () => {
    return execute<Customer[]>(customerQueries.getAllCustomers, []);
};

export const getCustomerById = async (id: Customer['customerId']) => {
    return execute<Customer>(customerQueries.getCustomerById, [id]);
};

export const insertCustomer = async (customer: Customer) => {
    const result = await execute<{ affectedRows: number }>(customerQueries.AddCustomer, [
        customer.toJSON()
    ]);
    return result.affectedRows > 0;
};

export const UpdateCustomer = async (customer: Customer) => {
    const result = await execute<{ affectedRows: number }>(customerQueries.UpdateCustomer, [
        customer.firstName,
        customer.lastName,
        customer.birthDate,
        customer.addressId,
        customer.email,
        customer.phoneNumber,
        customer.password,
        customer.gasType,
        customer.electricityType,
        customer.customerId
    ]);
    return result.affectedRows > 0;
};

export const deleteCustomer = async (id: Customer['customerId']) => {
    const result = await execute<{ affectedRows: number }>(customerQueries.DeleteCustomerById, [
        id
    ]);
    return result.affectedRows > 0;
};
