import {execute} from "../utils/database-connector";
import {customerQueries} from "../queries/customer";
import { Customer } from "../models/user";


export async function getAllCustomers(): Promise<Customer[] | null> {
    let res = await execute(customerQueries.getAllCustomers);
    if (res.rowCount === 0) return null;
    return res.rows as Customer[];
};

export async function getCustomerById(id: number): Promise<Customer | null> {
    let res = await execute(customerQueries.getCustomerById, [id]);
    if (res.rowCount === 0) return null;
    return res.rows[0] as Customer;
}
