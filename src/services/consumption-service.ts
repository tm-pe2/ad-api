import {execute} from "../utils/mysql.connector";
import {Consumtion} from '../classes/consumption';
import {consumtionQueries} from '../queries/consumtion-queries';

export const getAllConsumptions = async () => {
    return await execute<Consumtion[]>(consumtionQueries.getAllConsumptions, [], "rows");
};

export const getConsumptionById = async (id: Consumtion['consumption_id']) => {
    return await execute<Consumtion[]>(consumtionQueries.getConsumptionById, [id], "rows");
};

export const insertConsumption = async (consumption: Consumtion) => {
    const rowCount = await execute<number>(consumtionQueries.addConsumption, [
        consumption.meter_id,
        consumption.consumption,
        consumption.date
    ], "rowCount");

    return rowCount;
};

export const updateConsumption = async (consumption: Consumtion) => {
    const rowCount = await execute<number>(consumtionQueries.updateConsumption, [
        consumption.meter_id,
        consumption.consumption,
        consumption.date,
        consumption.consumption_id
    ], "rowCount");

    return rowCount;
}

export const deleteConsumption = async (id: Consumtion['consumption_id']) => {
    const rowCount = await execute<number>(consumtionQueries.deleteConsumptionById, [id], "rowCount");
    return rowCount > 0;
}