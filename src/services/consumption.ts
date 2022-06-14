import { PoolClient } from "pg";
import { Consumption, ConsumptionPost, Meter } from "../models/consumption";
import { consumptionQueries } from "../queries/consumption";
import { execute } from "../utils/database-connector";

export async function getConsumptionById(client: PoolClient, id: number): Promise<Consumption[] | null> {
    const consumption = await execute(client, consumptionQueries.getConsumptionById, [id]);
    if (consumption.rowCount === 0) return null;
    return consumption.rows;
}

export async function addIndexedValue(client: PoolClient, meter: Meter, readDate: Date): Promise<Boolean> {
    const res = await execute(client, consumptionQueries.insertConsumption, [
        meter.id,
        meter.index_value,
        readDate
    ]);

    return res.rowCount > 0;
}
