import { PoolClient } from "pg";
import { BuildingType, EquipmentType, Estimation, EstimationRegistration } from "../models/estimation";
import { estimationQueries } from "../queries/estimation";
import { execute } from "../utils/database-connector";

export async function getAllEstimations(client: PoolClient): Promise<Estimation[]> {
    const res = await execute(client, estimationQueries.getAllEstimations);
    if (res.rowCount === 0) return [];
    return res.rows as Estimation[];
}

// TODO: change TODO to real values after database change
export async function insertEstimation(client: PoolClient, estimation: EstimationRegistration, estimated_consumption: number): Promise<boolean> {
    const res = await execute(client, estimationQueries.insertEstimation, [
        estimation.service_type,
        estimation.building_type,
        estimation.address_id,
        estimation.family_size,
        estimation.equipment,
        estimation.past_consumption,
        estimated_consumption,
    ]);
    return res.rowCount > 0;
}

// Logic copied from Klara from front-end
// TODO: above 4 family members?
// TODO: 4 building types, 3 in code?
export function calculateEstimation(estimation: EstimationRegistration): number {
    let calc_estimation = 0;

    switch (estimation.family_size) {
        //daily electricity consumption in kWh of 'x' person(s) in an apartment:
        case 1:
            {
                calc_estimation += 18;
                break;
            }
        case 2:
            {
                calc_estimation += 28;
                break;
            }
        case 3:
            {
                calc_estimation += 40;
                break;
            }
        case 4:
            {
                calc_estimation += 60;
                break;
            }
    }

    //electricity consumption is adjusted depending on building type. e.g: closed house can get warmer easier than an open building, etc:

    switch (estimation.building_type) {
        case BuildingType.APARTMENT:
            {
                calc_estimation -= 5;
                break;
            }
        case BuildingType.CLOSED:
            {
                calc_estimation -= 2;
                break;
            }
        case BuildingType.OPEN:
            {
                calc_estimation += 5;
                break;
            }
    }

    //the amount of kWh consumed in a day from an appliance is added to the estimated consumption
    for (let i = 0; i < estimation.equipment.length; i++) {
        if (estimation.equipment[i] == EquipmentType.OVEN_STOVE) { calc_estimation += 1 }
        if (estimation.equipment[i] == EquipmentType.DISHWATER) { calc_estimation += 0.20 }
        if (estimation.equipment[i] == EquipmentType.WASHING_MACHINE) { calc_estimation += 0.36 }
        if (estimation.equipment[i] == EquipmentType.DRYING_MACHINE) { calc_estimation += 0.30 }
        if (estimation.equipment[i] == EquipmentType.HAIR_DRYER) { calc_estimation += 1.07 }
    }

    return calc_estimation;
}
