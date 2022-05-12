import {execute} from "../utils/mysql.connector";
import {Estimation} from "../classes/estimation";
import {estimationQueries} from "../queries/estimation-queries";

export const getAllEstimations = async () => {
    let estimations = execute<{rows: Estimation[]}>(estimationQueries.getAllEstimations, []);
    console.log(estimations);
    return (await estimations).rows;
};

export const getEstimationById = async (id: Estimation['EstimatedID']) => {
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
    return result.rowCount > 0;
};

export const deleteEstimationById = async (id: Estimation['EstimatedID']) => {
    const result = await execute<{ rowCount: number }>(estimationQueries.deleteEstimationById, [id]);
    return result.rowCount > 0;
};
