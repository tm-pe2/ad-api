export const planningQueries = {
    getAllPlannings: `
        SELECT * FROM planning
    `,

    getPlanningById: `
        SELECT * FROM planning WHERE PlanningID = $1
    `,

    addPlanning: `
        INSERT INTO planning SET $1
    `,

    updatePlanning: `
        UPDATE planning 
        SET
            EmployeeID = $1,
            CustomerID = $2,
            Date = $3,
            Status = $4
        WHERE PlanningID = $5
    `,

    deletePlanningById: `
        DELETE FROM planning WHERE PlanningID = $1
    `
};
