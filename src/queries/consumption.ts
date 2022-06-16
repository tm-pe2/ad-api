import { TABLES } from "./tables"

const selectConsumptionQuery = `
    SELECT
    cons.id,
    cons.consumed_value,
    cons.calculated_date,
    json_build_object(
            'id', u.id,
            'first_name', u.first_name,
            'last_name', u.last_name,
            'birth_date', u.birth_date,
            'email', u.email,
            'phone_number', u.phone_number,
            'national_registry_number', u.national_registry_number,
            'customer_type', cus.type_id,
            'active', u.active,
            'roles', array_agg(ur.role_id)
    ) as customer,

    json_build_object(
            'id', a.id,
            'street', a.street,
            'house_number', a.house_number,
            'city_name', ci.city_name,
            'postal_code', ci.postal_code,
            'country', a.country
        ) as address,
    json_build_object(
            'id', m.id,
            'meter_type', m.meter_type,
            'physical_id', m.physical_id,
            'index_value', iv.index_value,
            'read_date', iv.read_date
    ) as meter
    FROM ${TABLES.USERS} as u
    LEFT JOIN ${TABLES.CUSTOMERS} as cus ON u.id = cus.user_id
    LEFT JOIN ${TABLES.CUSTOMERS_CONTRACTS} as cc ON cus.user_id = cc.user_id
    LEFT JOIN ${TABLES.CONTRACTS} as c ON cc.contract_id = c.id
    LEFT JOIN ${TABLES.ADDRESSES} as a ON c.address_id = a.id
    LEFT JOIN ${TABLES.CITIES} as ci ON a.city_id = ci.id
    LEFT JOIN ${TABLES.CONTRACTS_METERS} as cm ON c.id = cm.contract_id
    LEFT JOIN ${TABLES.METERS} as m ON cm.meter_id = m.id
    LEFT JOIN ${TABLES.CONSUMPTIONS} as cons on m.id = cons.meter_id
    LEFT JOIN ${TABLES.INDEXED_VALUES} as iv ON cons.id = iv.meter_id
    LEFT JOIN ${TABLES.USERS_ROLES} as ur ON u.id = ur.user_id
`
const insertConsumption = `
    INSERT INTO ${TABLES.INDEXED_VALUES} as iv (meter_id, index_value, read_date) VALUES ($1, $2, $3)
`

export const consumptionQueries = {
    getConsumptionById: selectConsumptionQuery + `
        WHERE u.id = $1
        GROUP BY cons.id, u.id, a.id, m.id, iv.id, cus.type_id, ci.city_name,ci.postal_code
    `,
    insertConsumption: insertConsumption,
    getLastConsumptionByMeterId: selectConsumptionQuery + `
         WHERE cm.meter_id = $1
         GROUP BY cons.id , u.id, cus.type_id, a.id, m.id, iv.index_value, iv.read_date , cs.id, c.id, cus.user_id, a.street, a.house_number, ci.city_name, ci.postal_code, a.country, m.meter_type, m.physical_id
         ORDER BY cons.calculated_date DESC
         LIMIT 1;
    `,
}
