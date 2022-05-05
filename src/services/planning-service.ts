import {execute} from "../utils/mysql.connector";
import {Planning} from "../classes/planning";
import {planningQueries} from "../queries/planning-queries";

export const getAllPlannings = async () => {
    let plannings = execute<{rows: Planning[]}>(planningQueries.getAllPlannings, []);
    console.log(plannings);
    return (await plannings).rows;
};

export const getPlanningById = async (id: Planning['planning_id']) => {
    let planning = execute<{rows: Planning}>(planningQueries.getPlanningById, [id]);
    console.log(planning);
    return (await planning).rows;
};

export const insertPlanning = async (planning: Planning) => {
    const result = await execute<{ rowCount: number }>(planningQueries.addPlanning, [
        planning
    ]);
    return result.rowCount > 0;
};

export const updatePlanning = async (planning: Planning) => {
    const result = await execute<{ rowCount: number }>(planningQueries.updatePlanning, [
        planning.employee_id,
        planning.customer_id,
        planning.date,
        planning.status,
        planning.planning_id
    ]);
    return result.rowCount > 0;
};

export const deletePlanningById = async (id: Planning['planning_id']) => {
    const result = await execute<{ rowCount: number }>(planningQueries.deletePlanningById, [id]);
    return result.rowCount > 0;
};
