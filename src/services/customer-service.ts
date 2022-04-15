import {execute} from "../utils/mysql.connector";
import {Customer} from "../classes/customer";
import {customerQueries} from "../queries/customer-queries";

export const getAllCustomers = async () => {
    return execute<Customer[]>(customerQueries.getAllCustomers, []);
};

export const getCustomerById = async (id: Customer['CustomerID']) => {
    return execute<Customer>(customerQueries.getCustomerById, [id]);
};

export const insertCustomer = async (customer: Customer) => {
    const result = await execute<{ affectedRows: number }>(customerQueries.AddCustomer, [
        customer
    ]);
    return result.affectedRows > 0;
};

export const UpdateCustomer = async (customer: Customer) => {
    const result = await execute<{ affectedRows: number }>(customerQueries.UpdateCustomer, [
        customer.FirstName,
        customer.LastName,
        customer.BirthDate,
        customer.AdressID,
        customer.Email,
        customer.PhoneNumber,
        customer.Password,
        customer.GasType,
        customer.Electricitytype,
        customer.CustomerID
    ]);
    return result.affectedRows > 0;
};

export const deleteCustomer = async (id: Customer['CustomerID']) => {
    const result = await execute<{ affectedRows: number }>(customerQueries.DeleteCustomerById, [
        id
    ]);
    return result.affectedRows > 0;
};
