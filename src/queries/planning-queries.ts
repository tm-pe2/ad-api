export const planningQueries = {
    getAllPlannings: `
        SELECT * FROM planning
    `,

    getPlanningById: `
        SELECT * FROM planning WHERE planning_id = $1
    `,

    getPlanningByEmployeeId: `
        SELECT * FROM planning WHERE employee_id = $1
    `,

    addPlanning: `
        INSERT INTO planning (employee_id, contract_id, date, status)
            VALUES ($1, $2, $3, $4)
    `,

    updatePlanning: `
        UPDATE planning 
        SET
            employee_id = $1,
            contract_id = $2,
            date = $3,
            status = $4
        WHERE planning_id = $5
    `,

    deletePlanningById: `
        DELETE FROM planning WHERE planning_id = $1
    `
};
