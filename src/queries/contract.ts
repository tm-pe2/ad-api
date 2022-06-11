import { TABLES } from "./tables"

/* TODO: Estimation needed? */ 
const selectContractQuery = `
    SELECT
        c.id,
        users.id as user_id,
        c.start_date,
        c.end_date,
        c.tariff_id,
        c.estimation_id,
        json_build_object(
            'id', a.id,
            'street', a.street,
            'house_number', a.house_number,
            'city_name', ci.city_name,
            'postal_code', ci.postal_code,
            'country', a.country
        ) as address
    FROM ${TABLES.CONTRACTS} as c
    LEFT JOIN ${TABLES.ADDRESSES} as a ON c.address_id = a.id
    LEFT JOIN ${TABLES.CITIES} as ci ON a.city_id = ci.id
    LEFT JOIN ${TABLES.CUSTOMERS_CONTRACTS} as cc ON c.id = cc.contract_id
    LEFT JOIN ${TABLES.USERS} as u ON cc.user_id = u.id
`

const insertContractQuery = `
    INSERT INTO ${TABLES.CONTRACTS} as c (
        user_id,
        start_date,
        end_date,
        tariff_id,
        estimation_id,
        address_id
    ) VALUES ($1, $2, $3, $4, $5, $6)
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
    insertContract: insertContractQuery,
}
