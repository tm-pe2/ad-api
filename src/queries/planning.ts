import { MeterType } from "../models/estimation";
import { TABLES } from "./tables";

const getAllPlannings = `
    SELECT
        p.id,
        p.contract_id,
        p.date,
        p.status_id as status,
        json_build_object(
            'id', u.id,
            'first_name', u.first_name,
            'last_name', u.last_name,
            'birth_date', u.birth_date,
            'email', u.email,
            'phone_number', u.phone_number,
            'national_registry_number', u.national_registry_number,
            'address',json_build_object(
            'id', a.id, 
            'street', a.street,
            'house_number', a.house_number, 
            'city_name', ct.city_name, 
            'postal_code', ct.postal_code, 
            'country', a.country
        )
        ) as user
    FROM ${TABLES.PLANNINGS} as p
    LEFT JOIN ${TABLES.CONTRACTS} as c ON p.contract_id = c.id
    LEFT JOIN ${TABLES.CONTRACTS_METERS} as cm ON c.id = cm.contract_id
    LEFT JOIN ${TABLES.METERS} as m ON cm.meter_id = m.id
    LEFT JOIN ${TABLES.ADDRESSES} as a ON c.address_id = a.id
    LEFT JOIN ${TABLES.CITIES} as ct ON a.city_id = ct.id
    LEFT JOIN ${TABLES.USERS_ADDRESSES} as ua ON a.id = ua.address_id
    LEFT JOIN ${TABLES.USERS} as u ON ua.user_id = u.id
    WHERE m.meter_type = '${MeterType.MANUAL}'
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
