import { TABLES } from "./tables";


const selectIndexValueQuery = `
    SELECT 
    iv.id,
    iv.meter_id,
    iv.index_value,
    iv.read_date

    FROM ${TABLES.INDEXED_VALUES} as iv    
    
    WHERE iv.meter_id = $1
    ORDER BY iv.read_date
`

const instertConsumptionValue = `
    INSERT INTO ${TABLES.CONSUMPTIONS} as cons (meter_id,consumed_value,calculated_date) VALUES ($1,$2,$3)
`

export const indexValueQueries = {
    selectIndexValueQuery:selectIndexValueQuery,
    instertConsumptionValue:instertConsumptionValue
}


