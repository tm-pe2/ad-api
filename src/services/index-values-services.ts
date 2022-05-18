import {execute} from "../utils/mysql.connector";
import {IndexValues} from '../classes/index-values';
import {indexValuesQueries} from '../queries/index-values-queries';

export const getAllIndexValues = async () => {
    return await execute<IndexValues[]>(indexValuesQueries.getAllIndexValues, [], "rows");
};

export const getIndexValuesByMeterId = async (id: IndexValues['meter_id']) => {
    return await execute<IndexValues[]>(indexValuesQueries.getIndexValuesByMeterId, [id], "rows");
};

export const insertIndexValue = async (indexValues: IndexValues) => {
    const rowCount = await execute<number>(indexValuesQueries.addIndexValues, [
        indexValues.date,
        indexValues.index_value
    ], "rowCount");

    return rowCount;
};

export const updateIndexValues = async (indexValues: IndexValues) => {
    const rowCount = await execute<number>(indexValuesQueries.addIndexValues, [
        indexValues.meter_id,
        indexValues.date,
        indexValues.index_value,
        indexValues.index_id
    ], "rowCount");

    return rowCount;
}

export const deleteIndexValues = async (id: IndexValues['index_id']) => {
    const rowCount = await execute<number>(indexValuesQueries.deleteIndexValues, [id], "rowCount");
    return rowCount > 0;
}
