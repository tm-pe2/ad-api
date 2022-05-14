import {execute} from "../utils/mysql.connector";
import {Estimation} from "../classes/estimation";
import {estimationQueries} from "../queries/estimation-queries";

export const getAllEstimations = async () => {
    return await execute<Estimation[]>(estimationQueries.getAllEstimations, [], "rows");
};

export const getEstimationById = async (id: Estimation['estimation_id']) => {
    const estimations = await execute<Estimation[]>(estimationQueries.getEstimationById, [id], "rows");
    return estimations[0];
};

export const getEstimationByCustomerId = async (id: number) => {
    const estimations = await execute<Estimation[]>(estimationQueries.getEstimationByCustomerID, [id], "rows");
    return estimations[0];
};

export const insertEstimation = async (estimation: Estimation) => {
    const rowCount = await execute<number>(estimationQueries.addEstimation, [
        estimation.service_type,
        estimation.address_id,
        estimation.building_type,
        estimation.family_size,
        estimation.past_consumption,
        estimation.meters_number,
        estimation.meter_type,
        estimation.meter_value,
        estimation.meter_type2,
        estimation.meter_value2,
        estimation.meter_type3,
        estimation.meter_value3,
        estimation.equipments
    ], "rowCount");

    return rowCount > 0;
};

export const updateEstimation = async (estimation: Estimation) => {
    const rowCount = await execute<number>(estimationQueries.updateEstimation, [
        estimation.service_type,
        estimation.address_id,
        estimation.building_type,
        estimation.family_size,
        estimation.past_consumption,
        estimation.meters_number,
        estimation.meter_type,
        estimation.meter_value,
        estimation.meter_type2,
        estimation.meter_value2,
        estimation.meter_type3,
        estimation.meter_value3,
        estimation.equipments,
        estimation.estimation_id
    ], "rowCount");

    return rowCount > 0;
};

export const deleteEstimationById = async (id: Estimation['estimation_id']) => {
    const rowCount = await execute<number>(estimationQueries.deleteEstimationById, [id], "rowCount");

    return rowCount > 0;
};
