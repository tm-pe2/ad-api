import { CONTRACT_STATUS } from "../models/contract"
import { TABLES } from "./tables"

/* TODO: Estimation needed? */ 
const selectContractQuery = `
    SELECT
        c.id,
        u.id as user_id,
        c.start_date,
        c.end_date,
        c.estimation_id,
        json_build_object(
            'id', t.id,
            'customer_type', t.customer_type_id,
            'service_type', t.service_type,
            'value', t.value
        ) as tariff,
        json_build_object(
            'id', a.id,
            'street', a.street,
            'house_number', a.house_number,
            'city_name', ci.city_name,
            'postal_code', ci.postal_code,
            'country', a.country
        ) as address,
        c.status_id as status
    FROM ${TABLES.CONTRACTS} as c
    LEFT JOIN ${TABLES.ADDRESSES} as a ON c.address_id = a.id
    LEFT JOIN ${TABLES.CITIES} as ci ON a.city_id = ci.id
    LEFT JOIN ${TABLES.CUSTOMERS_CONTRACTS} as cc ON c.id = cc.contract_id
    LEFT JOIN ${TABLES.USERS} as u ON cc.user_id = u.id
    LEFT JOIN ${TABLES.TARIFFS} as t ON c.tariff_id = t.id
`

const insertNewContractQuery = `
    INSERT INTO ${TABLES.CONTRACTS} (

        tariff_id,

        estimation_id,
        address_id,
        status_id
    )
    VALUES ((
            SELECT id
            FROM ${TABLES.TARIFFS}
            WHERE customer_type_id = (
                SELECT type_id
                FROM ${TABLES.CUSTOMERS}
                WHERE user_id = $1
                ORDER BY type_id
                LIMIT 1
            )
            AND service_type = $2
        ),
    $3, $4, ${CONTRACT_STATUS.NOT_VALIDATED}
    )
    RETURNING id
`

const insertCustomersUsersQuery = `
    INSERT INTO ${TABLES.CUSTOMERS_CONTRACTS} (
        user_id,
        contract_id
    )
    VALUES ($1, $2)
`

const updateContractByMeterIdQuery = `
    UPDATE ${TABLES.CONTRACTS}
    SET status_id = $2
    SET start_date = $3
    SET end_date = $4
    WHERE id = (
        SELECT contract_id
        FROM ${TABLES.CONTRACTS_METERS}
        WHERE meter_id = $1
    )
    RETURNING id
`

export const contractQueries = {
    getAllContracts: selectContractQuery,
    getContractById: selectContractQuery + `
        WHERE c.id = $1
    `,
    getContractByUserId: selectContractQuery + `
        WHERE users.id = $1
    `,
    insertNewContract: insertNewContractQuery,
    insertCustomersUsers: insertCustomersUsersQuery,
    updateContractbyMeterId: updateContractByMeterIdQuery
}
