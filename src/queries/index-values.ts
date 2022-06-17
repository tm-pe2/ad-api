import { table } from "console";
import { TABLES } from "./tables";


const selectIndexValueQuery = `
    SELECT 
    iv.id,
    iv.meter_id,
    iv.index_value,
    iv.read_date,
    cc.user_id,
    json_agg(
        json_build_object(
            'id',iv.id,
            'meter_id',iv.meter_id,
            'index_value', iv.index_value,
            'read_date',iv.read_date,
            'user_id',cc.user_id
        )
    ) as indexValues

    FROM ${TABLES.INDEXED_VALUES} as iv
    INNER JOIN ${TABLES.METERS} as m on m.id = iv.meter_id
    INNER JOIN ${TABLES.CONTRACTS_METERS} as cm on cm.meter_id = m.id
    INNER JOIN ${TABLES.CONTRACTS} as c on contract_id = c.id
    INNER JOIN ${TABLES.CUSTOMERS_CONTRACTS} as cc on c.id = cc.contract_id
    
    WHERE iv.meter_id = $1
    GROUP BY iv.id,cc.user_id
    ORDER BY iv.read_date
`

const instertConsumptionValue = `
    INSERT INTO ${TABLES.CONSUMPTIONS} as cons (meter_id,consumed_value,calculated_date) VALUES ($1,$2,$3)
`

const selectContractQuery = `
        SELECT
        c.id,
        json_agg(
            json_build_object(
                'id',c.id,
            )
        ) as contrac_id
        FROM ${TABLES.CONTRACTS_METERS} as cm
        INNER JOIN ${TABLES.CONTRACTS} as c on c.id = cm.contract_id
        WHERE meter_id = $1
    
`

export const indexValueQueries = {
    selectIndexValueQuery:selectIndexValueQuery,
    instertConsumptionValue:instertConsumptionValue,
    selectContractQuery:selectContractQuery
}