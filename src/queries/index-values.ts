import { TABLES } from "./tables";


const selectIndexValueQuery = `
    SELECT 
    iv.id,
    iv.meter_id,
    iv.index_value,
    iv.read_date,
    u.id as user_id,
    json_agg(
        json_build_object(
            'id',iv.id,
            'meter_id',iv.meter_id,
            'index_value', iv.index_value,
            'read_date',iv.read_date,
            'user_id',u.id
        )
    ) as indexValues

    FROM ${TABLES.INDEXED_VALUES} as iv    
    LEFT JOIN ${TABLES.METERS} as m ON m.id = iv.meter_id
    LEFT JOIN ${TABLES.CONTRACTS_METERS} as cm ON cm.meter_id = m.id
    LEFT JOIN ${TABLES.CUSTOMERS_CONTRACTS} as cc ON cm.contract_id = cc.contract_id
    LEFT JOIN ${TABLES.USERS} as u ON u.id = cc.user_id
    
    WHERE iv.meter_id = $1
    GROUP BY u.id,iv.id
    ORDER BY iv.read_date
`

export const indexValueQueries = {
    selectIndexValueQuery
}

