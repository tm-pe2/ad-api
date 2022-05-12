export const planningQueries = {
    getAllPlannings: `
        SELECT * FROM planning
    `,

    getPlanningById: `
        SELECT * FROM planning WHERE planning_id = $1
    `,

    addPlanning: `
        INSERT INTO planning SET $1
    `,

    updatePlanning: `
        UPDATE planning 
        SET
            employee_id = $1,
            customer_id = $2,
            date = $3,
            status = $4
        WHERE planning_id = $5
    `,

    deletePlanningById: `
        DELETE FROM planning WHERE planning_id = $1
    `
};
