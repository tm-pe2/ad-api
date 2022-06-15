import { table } from "console";
import { TABLES } from "./tables";


const selectIndexValueQuery = `
    SELECT 
    meter_id,
    index_value,
    read_date,
    json_agg(
        json_build_object(
            'id',iv.id,
            'index_value', iv.index_value,
            'read_date',iv.read_date
        )
    ) as indexValues

    
    FROM ${TABLES.INDEXED_VALUES} as iv
    
    WHERE meter_id = $1
    group by iv.id
`

export const indexValueQueries = {
    selectIndexValueQuery
}

