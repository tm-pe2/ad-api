import {execute} from "../utils/database-connector";
import {Meter} from '../classes/meters';
import {metersQueries} from '../queries/meters-queries';
import {Contract} from "../classes/contracts";

export const getAllMeters = async () => {
    return await execute<Meter[]>(metersQueries.getAllMeters, [], "rows");
};

export const getMeterById = async (id: Meter['meter_id']) => {
    return await execute<Meter[]>(metersQueries.getMeterById, [id], "rows");
};

export const getMeterByPhysicalId = async (id: Meter['physical_id']) => {
    try {
        const result = await execute<Meter[]>(metersQueries.getMeterByPhysicalId, [id], "rows");
        if(result)
        {
            return result[0].physical_id;
        }
        return -1;
    } catch (error) {
        return -1;
    }
};

export const insertMeter = async (meter: Meter) => {
    const meterID = await execute<Meter[]>(metersQueries.addMeter, [
        meter.meter_type,
        meter.physical_id
    ], "rows");
    console.log(meterID);
    return meterID[0].meter_id;
};

export const updateMeter = async (meter: Meter) => {
    const rowCount = await execute<number>(metersQueries.addMeter, [
        meter.meter_type,
        meter.physical_id,
        meter.meter_id
    ], "rowCount");

    return rowCount;
}

export const deleteMeter = async (id: Meter['meter_id']) => {
    const rowCount = await execute<number>(metersQueries.deleteMeter, [id], "rowCount");
    return rowCount > 0;
}

export const getMetersByContractId = async (contractId: number) => {
    return await execute<Meter[]>(metersQueries.getMetersByContractId, [contractId], "rows");
}
