import { PoolClient } from "pg";
import { Consumption, ConsumptionPost } from "../models/consumption";
import { consumptionQueries } from "../queries/consumption";
import { execute } from "../utils/database-connector";

export async function getConsumptionById(client: PoolClient, id: number): Promise<Consumption | null> {
    const consumption = await execute(client, consumptionQueries.getConsumptionById, [id]);
    if (consumption.rowCount === 0) return null;
    return consumption.rows[0];
}

export async function createConsumption(client: PoolClient, consumption: ConsumptionPost): Promise<Boolean> {
    const res = await execute(client, consumptionQueries.insertConsumption, [
        consumption.meter_id,
        consumption.index_value,
        consumption.read_date
    ]);

    return res.rowCount > 0;
}