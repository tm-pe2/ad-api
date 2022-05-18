import {execute} from "../utils/mysql.connector";
import {Consumption} from '../classes/consumption';
import {consumtionQueries} from '../queries/consumtion-queries';

export const getAllConsumptions = async () => {
    return await execute<Consumption[]>(consumtionQueries.getAllConsumptions, [], "rows");
};

export const getConsumptionById = async (id: Consumption['consumption_id']) => {
    return await execute<Consumption[]>(consumtionQueries.getConsumptionById, [id], "rows");
};

export const insertConsumption = async (consumption: Consumption) => {
    const rowCount = await execute<number>(consumtionQueries.addConsumption, [
        consumption.meter_id,
        consumption.consumption,
        consumption.date
    ], "rowCount");

    return rowCount;
};

export const updateConsumption = async (consumption: Consumption) => {
    const rowCount = await execute<number>(consumtionQueries.updateConsumption, [
        consumption.meter_id,
        consumption.consumption,
        consumption.date,
        consumption.consumption_id
    ], "rowCount");

    return rowCount;
}

export const deleteConsumption = async (id: Consumption['consumption_id']) => {
    const rowCount = await execute<number>(consumtionQueries.deleteConsumptionById, [id], "rowCount");
    return rowCount > 0;
}