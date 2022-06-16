import {execute} from "../utils/database-connector";
import {customerQueries} from "../queries/customer";
import { Customer } from "../models/user";
import { PoolClient } from "pg";
import { userQueries } from "../queries/users";
import { insertAddress } from "./address";
import { Logger } from "../utils/logger";


export async function getAllCustomers(client: PoolClient): Promise<Customer[] | null> {
    let res = await execute(client,customerQueries.getAllCustomers);
    if (res.rowCount === 0) return null;
    return res.rows as Customer[];
};

export async function getCustomerById(client:PoolClient, id: number): Promise<Customer | null> {
    let res = await execute(client,customerQueries.getCustomerById, [id]);
    if (res.rowCount === 0) return null;
    return res.rows[0] as Customer;
}
export async function insertCustomer(client:PoolClient, user_id: number, type_id: number): Promise<boolean>{
    const result = await execute(client, customerQueries.addCustomer, [user_id, type_id]);

    return result.rowCount > 0;
};

export async function modifyCustomer(client:PoolClient, customer: Customer): Promise<boolean>{
    try {
        await execute(client, customerQueries.modifyCustomer, [
            customer.id,
            customer.customer_type,
        ]);

        await execute(client, userQueries.modifyUser, [
            customer.id,
            customer.first_name,
            customer.last_name,
            customer.birth_date,
            customer.email,
            customer.phone_number,
            customer.national_registry_number,
            customer.password,
            customer.active,
        ]);

        for (let i = 0; i < customer.addresses.length; i++) {
            insertAddress(client, customer.addresses[i]);
        }

        // role is not modified
        return true;
    }
    catch(e) {
        Logger.error(e);
        return false;
    }
}
