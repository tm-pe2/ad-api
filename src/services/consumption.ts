import { PoolClient } from "pg";
import { calcConstumtionMeter } from "../calculateConstumptions/calculateConsumptions";
import { Consumption, ConsumptionPost, Meter } from "../models/consumption";
import { CONTRACT_STATUS } from "../models/contract";
import { PlanningStatus as PLANNING_STATUS } from "../models/planning";
import { consumptionQueries } from "../queries/consumption";
import { execute } from "../utils/database-connector";
import {activivateContractByMeterId, getContractIdByMeterId} from "./contract";
import { createPlanning } from "./planning";

export async function getConsumptionById(client: PoolClient, id: number): Promise<Consumption[] | null> {
    const consumption = await execute(client, consumptionQueries.getConsumptionById, [id]);
    console.log(consumption.rows)
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
        if (await activivateContractByMeterId(client, meter.id, readDate)) 
        {
            // Contract has been activated
            const contractId = await getContractIdByMeterId(client, meter.id);
            if (contractId == null) {
                throw new Error("Contract not found to activate");
            }
            
            // Read date + 11 months
            const endContractPlanning = new Date(readDate);
            endContractPlanning.setMonth(endContractPlanning.getMonth() + 11);
            const planning = createPlanning(client, contractId, readDate, PLANNING_STATUS.SCHEDULED);
            if (planning == null) {
                throw new Error("Planning not created");
            }
        }
        else{
            calcConstumtionMeter(meter.id);
        }
    }

    return res.rowCount > 0;
}

export async function getLastConsumptionByMeterId(client: PoolClient, id: number): Promise<Consumption | null> {
    const consumption = await execute(client, consumptionQueries.getLastConsumptionByMeterId, [id]);
    if (consumption.rowCount === 0) return null;
    return consumption.rows[0] as Consumption;
}
