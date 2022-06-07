import {execute} from "../utils/database-connector";
import { Customer } from "../models/user";
import { PoolClient } from "pg";
import { contractQueries } from "../queries/contract";
import { Contract } from "../models/contract";


export async function getAllContracts(client: PoolClient): Promise<Contract[] | null> {
    let res = await execute(client, contractQueries.getAllContracts);
    if (res.rowCount === 0) return null;
    return res.rows as Contract[];
};

export async function getContractById(client:PoolClient, id: number): Promise<Contract | null> {
    let res = await execute(client,contractQueries.getContractById, [id]);
    if (res.rowCount === 0) return null;
    return res.rows[0] as Contract;
}
