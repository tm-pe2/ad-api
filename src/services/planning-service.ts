import {execute} from "../utils/mysql.connector";
import {Planning} from "../classes/planning";
import {planningQueries} from "../queries/planning-queries";

export const getAllPlannings = async () => {
    return await execute<Planning[]>(planningQueries.getAllPlannings, [], "rows");
};

export const getPlanningById = async (id: Planning['planning_id']) => {
    const plannings = await execute<Planning[]>(planningQueries.getPlanningById, [id], "rows");
    return plannings[0];
};

export const getPlanningByEmployeeId = async (id: Planning['employee_id']) => {
    const plannings = await execute<Planning[]>(planningQueries.getPlanningByEmployeeId, [id], "rows");
    return plannings[0];
};

export const getPlanningDetailsById = async (id: Planning['planning_id']) => {
    return await execute<Planning[]>(planningQueries.getPlaningDetailsById, [id], "rows");
};

export const insertPlanning = async (planning: Planning) => {
    const rowCount = await execute<number>(planningQueries.addPlanning, [
        planning.employee_id,
        planning.contract_id,
        planning.date,
        planning.status
    ], "rowCount");

    return rowCount > 0;
};

export const updatePlanning = async (planning: Planning) => {
    const rowCount = await execute<number>(planningQueries.updatePlanning, [
        planning.employee_id,
        planning.contract_id,
        planning.date,
        planning.status,

        planning.planning_id
    ], "rowCount");
    return rowCount > 0;
};

export const deletePlanningById = async (id: Planning['planning_id']) => {
    const rowCount = await execute<number>(planningQueries.deletePlanningById, [id], "rowCount");
    return rowCount > 0;
};
