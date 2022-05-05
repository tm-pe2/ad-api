import {execute} from "../utils/mysql.connector";
import {Estimation} from "../classes/estimation";
import {estimationQueries} from "../queries/estimation-queries";

export const getAllEstimations = async () => {
    let estimations = execute<{rows: Estimation[]}>(estimationQueries.getAllEstimations, []);
    console.log(estimations);
    return (await estimations).rows;
};

export const getEstimationById = async (id: Estimation['estimation_id']) => {
    let estimation = execute<{rows: Estimation}>(estimationQueries.getEstimationById, [id]);
    console.log(estimation);
    return (await estimation).rows;
};

export const insertEstimation = async (estimation: Estimation) => {
    const result = await execute<{ rowCount: number }>(estimationQueries.addEstimation, [
        estimation
    ]);
    return result.rowCount > 0;
};

export const updateEstimation = async (estimation: Estimation) => {
    const result = await execute<{ rowCount: number }>(estimationQueries.updateEstimation, [
        estimation.service_type,
        estimation.address_id,
        estimation.building_type,
        estimation.family_size,
        estimation.past_consumption,
        estimation.electric_car,
        estimation.wellness,
        estimation.heating_type,
        estimation.estimation_id
    ]);
    return result.rowCount > 0;
};

export const deleteEstimationById = async (id: Estimation['estimation_id']) => {
    const result = await execute<{ rowCount: number }>(estimationQueries.deleteEstimationById, [id]);
    return result.rowCount > 0;
};
