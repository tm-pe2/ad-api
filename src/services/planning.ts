import { PoolClient } from "pg";
import { Planning, PlanningStatus } from "../models/planning";
import { Role } from "../models/role";
import { planningQueries } from "../queries/planning";
import { roleQueries } from "../queries/roles";
import { execute } from "../utils/database-connector";


export async function getAllPlannings(client: PoolClient): Promise<Planning[] | null> {
    let res = await execute(client, planningQueries.getAllPlannings);
    if (res.rowCount === 0) return [];
    return res.rows as Planning[];
};

export async function changePlanningStatus(client: PoolClient, id: number, status: number): Promise<boolean> {
    const res = await execute(client, planningQueries.changePlanningStatus, [id, status]);
    return res.rowCount !== 0;
}

export async function createPlanning(client: PoolClient, contract_id: number, date: Date, status: PlanningStatus): Promise<number | null> {
    const res = await execute(client, planningQueries.insertPlanning, [
        contract_id, date, status
    ]);
    if (res.rowCount === 0) return null;
    return res.rows[0];
}
