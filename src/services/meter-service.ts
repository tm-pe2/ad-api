import {execute} from "../utils/mysql.connector";
import {Meter} from '../classes/meters';
import {metersQueries} from '../queries/meters-queries';

export const getAllMeters = async () => {
    return await execute<Meter[]>(metersQueries.getAllMeters, [], "rows");
};

export const getMeterById = async (id: Meter['meter_id']) => {
    return await execute<Meter[]>(metersQueries.getMeterById, [id], "rows");
};

export const insertMeter = async (meter: Meter) => {
    const rowCount = await execute<number>(metersQueries.addMeter, [
        meter.meter_type,
        meter.physical_id
    ], "rowCount");

    return rowCount;
};

export const updateContractMeters = async (meter: Meter) => {
    const rowCount = await execute<number>(metersQueries.addMeter, [
        meter.meter_type,
        meter.physical_id,
        meter.meter_id
    ], "rowCount");

    return rowCount;
}

export const deleteContractMeters = async (id: Meter['meter_id']) => {
    const rowCount = await execute<number>(metersQueries.deleteMeter, [id], "rowCount");
    return rowCount > 0;
}