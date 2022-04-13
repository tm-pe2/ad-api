/** source/controllers/clients.ts */
import {execute} from "../utils/mysql.connector";
import {Estimation} from "../classes/estimation";
import {estimationQueries} from "../queries/estimation-queries";

export const getAllEstimations = async () => {
    return execute<Estimation[]>(estimationQueries.getAllEstimations, []);
};

export const getEstimationById = async (id: Estimation['estimationId']) => {
    return execute<Estimation>(estimationQueries.getEstimationById, [id]);
};

export const insertEstimation = async (estimation: Estimation) => {
    const result = await execute<{ affectedRows: number }>(estimationQueries.addEstimation, [
        estimation.toJSON()
    ]);
    return result.affectedRows > 0;
};

export const updateEstimation = async (estimation: Estimation) => {
    const result = await execute<{ affectedRows: number }>(estimationQueries.updateEstimation, [
        estimation.serviceType,
        estimation.addressId,
        estimation.buildingType,
        estimation.familySize,
        estimation.pastConsumption,
        estimation.electricCar,
        estimation.wellness,
        estimation.heatingType,
        estimation.estimationId
    ]);
    return result.affectedRows > 0;
};

export const deleteEstimationById = async (id: Estimation['estimationId']) => {
    const result = await execute<{ affectedRows: number }>(estimationQueries.deleteEstimationById, [id]);
    return result.affectedRows > 0;
};
