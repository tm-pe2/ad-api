export const planningQueries = {
    getAllPlannings: `
        SELECT * FROM planning
    `,

    getPlanningById: `
        SELECT * FROM planning WHERE PlanningID = ?
    `,

    addPlanning: `
        INSERT INTO planning SET ?
    `,

    updatePlanning: `
        UPDATE planning 
        SET
            EmployeeID = ?,
            CustomerID = ?,
            Date = ?,
            Status = ?
        WHERE PlanningID = ?
    `,

    deletePlanningById: `
        DELETE FROM planning WHERE PlanningID = ?
    `
};
