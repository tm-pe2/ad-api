import { PoolClient } from "pg";
import { Role } from "../models/role";
import { roleQueries } from "../queries/roles";
import { execute } from "../utils/database-connector";


export async function getAllRoles(client: PoolClient): Promise<Role[] | null> {
    let res = await execute(client,roleQueries.getAllRoles);
    if (res.rowCount === 0) return null;
    return res.rows as Role[];
};