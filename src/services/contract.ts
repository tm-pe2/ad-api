import {execute} from "../utils/database-connector";
import { Customer } from "../models/user";
import { PoolClient } from "pg";
import { contractQueries } from "../queries/contract";
import { Contract, CONTRACT_STATUS } from "../models/contract";
import { ServiceType } from "../models/estimation";


export async function getAllContracts(client: PoolClient): Promise<Contract[] | null> {
    const res = await execute(client, contractQueries.getAllContracts);
    if (res.rowCount === 0) return [];
    return res.rows as Contract[];
};

export async function getContractById(client:PoolClient, id: number): Promise<Contract | null> {
    const res = await execute(client,contractQueries.getContractById, [id]);
    if (res.rowCount === 0) return null;
    return res.rows[0] as Contract;
}

export async function getContractByUserId(client:PoolClient, user_id: number): Promise<Contract[] | null> {
    const res = await execute(client,contractQueries.getContractByUserId, [user_id]);
    if (res.rowCount === 0) return null;
    return res.rows as Contract[];
}

export async function addNewContract(client:PoolClient,
    userId: number, serviceType: ServiceType, estimationId: number, addressId: number): Promise<number | null> {
    const res = await execute(client,contractQueries.insertNewContract, [
        userId, serviceType, estimationId, addressId
    ]);
    if (res.rowCount === 0) return null;
    const contract_id = res.rows[0].id;

    const intermediateRes = await execute(client,contractQueries.insertCustomersUsers, [
        userId, contract_id
    ]);
    if (intermediateRes.rowCount === 0) return null;

    return contract_id;
}

export async function updateContractStatusByMeterId(client:PoolClient, meterId: number, status: CONTRACT_STATUS): Promise<Boolean> {
    const res = await execute(client,contractQueries.updateContractStatus, [
        meterId, status
    ]);
    return res.rowCount > 0;
}
