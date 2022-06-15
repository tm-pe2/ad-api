import {execute} from "../utils/database-connector";
import {customerQueries} from "../queries/customer";
import { Customer } from "../models/user";
import { PoolClient } from "pg";


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