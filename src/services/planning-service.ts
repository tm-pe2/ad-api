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
    const result = await execute<{ affectedRows: number }>(planningQueries.addPlanning, [
        planning
    ]);
    return result.affectedRows > 0;
};

export const updatePlanning = async (planning: Planning) => {
    const result = await execute<{ affectedRows: number }>(planningQueries.updatePlanning, [
        planning.EmployeeID,
        planning.CustomerID,
        planning.Date,
        planning.Status,
        planning.PlanningID
    ]);
    return result.affectedRows > 0;
};

export const deletePlanningById = async (id: Planning['PlanningID']) => {
    const result = await execute<{ affectedRows: number }>(planningQueries.deletePlanningById, [id]);
    return result.affectedRows > 0;
};
