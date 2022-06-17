import { PoolClient } from "pg";
import { index_value } from "../models/index-value";
import {indexValueQueries} from "../queries/index-values"
import { execute } from "../utils/database-connector";

export async function getIndexValueById(client : PoolClient,id:number): Promise<index_value[] | null>{
    const index_values = await execute(client, indexValueQueries.selectIndexValueQuery,[id]);
    if(index_values.rowCount == 0){
        return null;
    }
    return index_values.rows;
}


export async function addConsumption(client: PoolClient, consumption : Array<number | Date>): Promise<Boolean> {
    const res = await execute(client, indexValueQueries.instertConsumptionValue, [
        consumption[0],
        consumption[1],
        consumption[2],
    ]);
    return res.rowCount > 0;
}

export async function getContractIdByMeterId(client : PoolClient,id:number): Promise<number | null>{
    const res = await execute(client, indexValueQueries.selectContractQuery,[id]);
    if(res.rowCount == 0){
        return null;
    }
    return res.rows[0].id;
}
