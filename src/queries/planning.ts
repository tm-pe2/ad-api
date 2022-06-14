import { TABLES } from "./tables";

const getAllPlannings = `
    SELECT
        p.id,
        p.contract_id,
        p.date,
        p.status_id as status,
        json_build_object(
            'id', a.id, 
            'street', a.street,
            'house_number', a.house_number, 
            'city_name', c.city_name, 
            'postal_code', c.postal_code, 
            'country', a.country)
        ) as address,
    FROM ${TABLES.PLANNINGS} as p
    LEFT JOIN ${TABLES.USERS} as u ON p.user_id = u.id
    LEFT JOIN ${TABLES.CONTRACTS} as c ON p.contract_id = c.id
    LEFT JOIN ${TABLES.USERS_ADDRESSES} as ua ON u.id = ua.user_id
    LEFT JOIN ${TABLES.ADDRESSES} as a ON ua.address_id = a.id
`;

const changePlanningStatus = `
    UPDATE ${TABLES.PLANNINGS}
    SET status_id = $2
    WHERE id = $1
    RETURNING id
`;

const insertPlanning = `
    INSERT INTO ${TABLES.PLANNINGS} (
        contract_id,
        date,
        status_id
    ) VALUES ($1, $2, $3)
    RETURNING id
`;

export const planningQueries = {
    getAllPlannings: getAllPlannings,
    changePlanningStatus: changePlanningStatus,
    insertPlanning: insertPlanning,
}
