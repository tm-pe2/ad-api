import {execute} from "../utils/mysql.connector";
import {Estimation} from "../classes/estimation";
import {estimationQueries} from "../queries/estimation-queries";

export const getAllEstimations = async () => {
    return execute<Estimation[]>(estimationQueries.getAllEstimations, []);
};

export const getEstimationById = async (id: Estimation['EstimatedID']) => {
    return execute<Estimation>(estimationQueries.getEstimationById, [id]);
};

export const insertEstimation = async (estimation: Estimation) => {
    const result = await execute<{ affectedRows: number }>(estimationQueries.addEstimation, [
        estimation
    ]);
    return result.affectedRows > 0;
};

export const updateEstimation = async (estimation: Estimation) => {
    const result = await execute<{ affectedRows: number }>(estimationQueries.updateEstimation, [
        estimation.ServiceType,
        estimation.AdressID,
        estimation.BuildingType,
        estimation.FamilySize,
        estimation.PastConsumption,
        estimation.ElectricCar,
        estimation.Welness,
        estimation.HeatingType,
        estimation.EstimatedID
    ]);
    return result.affectedRows > 0;
};

export const deleteEstimationById = async (id: Estimation['EstimatedID']) => {
    const result = await execute<{ affectedRows: number }>(estimationQueries.deleteEstimationById, [id]);
    return result.affectedRows > 0;
};
