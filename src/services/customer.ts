import {execute} from "../utils/database-connector";
import {customerQueries} from "../queries/customer-queries";
import { addressQueries } from "../queries/address-queries";
import { Customer } from "../models/user";

async function customerFromRowResult(customer: any): Promise<Customer> {
    let addresses = await execute(addressQueries.getAddressesByUserId, [customer.user_id]);
            
    return {
        id: customer.user_id,
        first_name: customer.first_name,
        last_name: customer.last_name,
        gender: '',
        birth_date: customer.birth_date,
        email: customer.email,
        phone_number: customer.phone_number,
        national_registry_number: customer.national_registry_number,
        addresses: addresses.rows,
        role_ids: [customer.role_id],
        type: customer.customer_type, // TODO PROPER TYPES HERE
    }
}

export async function getAllCustomers() {
    let res = await execute(customerQueries.getAllCustomers, []);
    if (res.rowCount > 0) {
        let customers: Customer[] = await Promise.all(res.rows.map(async (customer) => {
            return await customerFromRowResult(customer);
        }));
        return customers;
    }
    else {
        return [];
    }
};

export async function getCustomerById(id: number): Promise<Customer | null> {
    let res = await execute(customerQueries.getCustomerById, [id]);
    if (res.rowCount > 0) {
        console.log(res.rows);
        let customer = res.rows[0];
        return await customerFromRowResult(customer);
    }
    return null;
}

// export const getCustomerById = async (id: Customer['customer_id']) => {
//     const customers = await execute<Customer[]>(customerQueries.getCustomerById, [id], "rows");
//     return customers[0];
// };

// export const getCustomerByUserId = async (id: Customer['user_id']) => {
//     const customers = await execute<Customer[]>(customerQueries.getCustomerByUserId, [id], "rows");
//     return customers;
// };

// export const getCustomersContracts = async () => {
//     return execute<Customer[]>(customerQueries.getCustomersContracts, [], "rows");
// };

// export const getCustomersContractsByID = async (id: Customer['customer_id']) => {
//     return execute<Customer[]>(customerQueries.getCustomersContractsByID, [id], "rows");
// };

// export const insertCustomer = async (customer: Customer) => {
//     const rowCount = await execute<number>(customerQueries.AddCustomer, [
//         customer.user_id,
//         customer.customer_type,
//     ], "rowCount");

//     return rowCount > 0;
// };

// export const updateCustomer = async (customer_type: Customer['customer_type'],customer_id: Customer['customer_id']) => {
//     const rowCount = await execute<number>(customerQueries.updateCustomer, [
//         customer_type,
//         customer_id
//     ], "rowCount");

//     return rowCount;
// };

// export const deleteCustomer = async (id: Customer['customer_id']) => {
//     const rowCount = await execute<number>(customerQueries.DeleteCustomerById, [id], "rowCount");
//     return rowCount;
// };
