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

    getPlaningDetailsById:`
        SELECT u.first_name, u.last_name,
        a.street,a.house_number,a.city,a.postal_code,a.country,
        p.status
        FROM planning p
        INNER JOIN employees e ON p.employee_id = e.employee_id
        INNER JOIN users u ON e.user_id= u.user_id
        INNER JOIN useraddress ua ON u.user_id = ua.user_id
        INNER JOIN address a ON ua.address_id = a.address_id
        WHERE p.planning_id = $1
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
