import { PoolClient } from "pg";
import { employeeQueries } from "../queries/employee";
import { execute } from "../utils/database-connector";


export async function insertEmployee(client: PoolClient, user_id: number, hire_date: Date, salary: number){
    const result = await execute(client, employeeQueries.insertEmployee, [user_id, hire_date, salary]);
    return result.rowCount > 0;
}