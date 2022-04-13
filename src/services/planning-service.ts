import {execute} from "../utils/mysql.connector";
import {Planning} from "../classes/planning";
import {planningQueries} from "../queries/planning-queries";

export const getAllPlannings = async () => {
    return execute<Planning[]>(planningQueries.getAllPlannings, []);
};

export const getPlanningById = async (id: Planning['planningId']) => {
    return execute<Planning>(planningQueries.getPlanningById, [id]);
};

export const insertPlanning = async (planning: Planning) => {
    const result = await execute<{ affectedRows: number }>(planningQueries.addPlanning, [
        planning.toJSON()
    ]);
    return result.affectedRows > 0;
};

export const updatePlanning = async (planning: Planning) => {
    const result = await execute<{ affectedRows: number }>(planningQueries.updatePlanning, [
        planning.employeeId,
        planning.customerId,
        planning.date,
        planning.status,
        planning.planningId
    ]);
    return result.affectedRows > 0;
};

export const deletePlanningById = async (id: Planning['planningId']) => {
    const result = await execute<{ affectedRows: number }>(planningQueries.deletePlanningById, [id]);
    return result.affectedRows > 0;
};
