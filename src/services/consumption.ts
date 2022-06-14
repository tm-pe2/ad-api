import { PoolClient } from "pg";
import { Consumption, ConsumptionPost, Meter } from "../models/consumption";
import { CONTRACT_STATUS } from "../models/contract";
import { consumptionQueries } from "../queries/consumption";
import { execute } from "../utils/database-connector";
import {updateContractStatusByMeterId} from "./contract";

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

    // Start the contract (status active + start and end date)
    // This isn't the most efficient way since multiple queries are executed
    // eventhough they might be from the same contract
    // But it's the easiest/safest way to implement this
    if (res.rowCount > 0) {
        if (!await updateContractStatusByMeterId(client, meter.id, CONTRACT_STATUS.ACTIVE))
            throw new Error("Failed to update contract status");
    }

    return res.rowCount > 0;
}
