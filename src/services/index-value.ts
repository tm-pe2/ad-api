import { PoolClient } from "pg";
import { index_value } from "../models/index-value";
import {indexValueQueries} from "../queries/index-values"
import { execute } from "../utils/database-connector";

export async function getIndexValueById(client : PoolClient,id:number): Promise<index_value[] | null>{
    const index_values = await execute(client, indexValueQueries.selectIndexValueQuery,[id]);
    console.log("index values:",index_values.rows);
    if(index_values.rowCount == 0){
        return null;
    }
    return index_values.rows;
}