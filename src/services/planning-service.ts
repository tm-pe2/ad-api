import {execute} from "../utils/mysql.connector";
import {Planning} from "../classes/planning";
import {planningQueries} from "../queries/planning-queries";

export const getAllPlannings = async () => {
    return execute<Planning[]>(planningQueries.getAllPlannings, []);
};

export const getPlanningById = async (id: Planning['PlanningID']) => {
    return execute<Planning>(planningQueries.getPlanningById, [id]);
};

export const insertPlanning = async (planning: Planning) => {
    const result = await execute<{ rowCount: number }>(planningQueries.addPlanning, [
        planning
    ]);
    return result.rowCount > 0;
};

export const updatePlanning = async (planning: Planning) => {
    const result = await execute<{ rowCount: number }>(planningQueries.updatePlanning, [
        planning.EmployeeID,
        planning.CustomerID,
        planning.Date,
        planning.Status,
        planning.PlanningID
    ]);
    return result.rowCount > 0;
};

export const deletePlanningById = async (id: Planning['PlanningID']) => {
    const result = await execute<{ rowCount: number }>(planningQueries.deletePlanningById, [id]);
    return result.rowCount > 0;
};
