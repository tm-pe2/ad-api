import {execute} from "../utils/database-connector";
import { Customer } from "../models/user";
import { PoolClient } from "pg";
import { contractQueries } from "../queries/contract";
import { Contract, ContractPost } from "../models/contract";


export async function getAllContracts(client: PoolClient): Promise<Contract[] | null> {
    let res = await execute(client, contractQueries.getAllContracts);
    if (res.rowCount === 0) return [];
    return res.rows as Contract[];
};

export async function getContractById(client:PoolClient, id: number): Promise<Contract | null> {
    let res = await execute(client,contractQueries.getContractById, [id]);
    if (res.rowCount === 0) return null;
    return res.rows[0] as Contract;
}

export async function getContractByUserId(client:PoolClient, user_id: number): Promise<Contract[] | null> {
    let res = await execute(client,contractQueries.getContractByUserId, [user_id]);
    if (res.rowCount === 0) return null;
    return res.rows as Contract[];
}

export async function addContract(client:PoolClient, contract: ContractPost): Promise<boolean> {
    let res = await execute(client,contractQueries.insertContract, [
        contract.user_id,
        contract.start_date,
        contract.end_date,
        contract.tariff_id,
        contract.estimation_id,
        contract.address_id
    ]);
    return res.rowCount > 0;
}
