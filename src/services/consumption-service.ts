import {execute} from "../utils/mysql.connector";
import {Consumption} from '../classes/consumption';
import {consumptionQueries} from '../queries/consumption-queries';
import {Meter} from "../classes/meters";

export const getAllConsumptions = async () => {
    return await execute<Consumption[]>(consumptionQueries.getAllConsumptions, [], "rows");
};

export const getConsumptionById = async (id: Consumption['consumption_id']) => {
    return await execute<Consumption[]>(consumptionQueries.getConsumptionById, [id], "rows");
};

export const insertConsumption = async (consumption: Consumption) => {
    const rowCount = await execute<number>(consumptionQueries.addConsumption, [
        consumption.meter_id,
        consumption.consumption,
        consumption.date
    ], "rowCount");

    return rowCount;
};

export const updateConsumption = async (consumption: Consumption) => {
    const rowCount = await execute<number>(consumptionQueries.updateConsumption, [
        consumption.meter_id,
        consumption.consumption,
        consumption.date,
        consumption.consumption_id
    ], "rowCount");

    return rowCount;
}

export const deleteConsumption = async (id: Consumption['consumption_id']) => {
    const rowCount = await execute<number>(consumptionQueries.deleteConsumptionById, [id], "rowCount");
    return rowCount > 0;
}

export const getConsumptionByMeterIdAndPeriod = async (meterId: Meter['meter_id'], period_start: Date, period_end: Date) => {
    const result = await execute<Consumption[]>(consumptionQueries.getConsumptionByMeterIdAndPeriod, [
        meterId,
        period_start,
        period_end
    ], "rows");

    return result[0];
}
