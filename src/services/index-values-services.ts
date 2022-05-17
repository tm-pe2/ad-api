import {execute} from "../utils/mysql.connector";
import {IndexValues} from '../classes/index-values';
import {indexValuesQueries} from '../queries/index-values-queries';

export function getAllIndexValues(): Promise<IndexValues[]> {
    const promise = new Promise<IndexValues[]>((resolve,reject) => {
        execute<IndexValues[]>(indexValuesQueries.getAllIndexValues, []).then((result) => {
            if(result)
                resolve(result);
            else
                reject("No index-values!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};

export function getIndexValuesByMeterId(id: IndexValues['meter_id']): Promise<IndexValues[]> {
    const promise = new Promise<IndexValues[]>((resolve,reject) => {
        execute<IndexValues[]>(indexValuesQueries.getIndexValuesByMeterId, [id]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("No index-values!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};

export function insertIndexValue(indexValues: IndexValues): Promise<number> {
    const promise = new Promise<number>((resolve,reject) => {
        execute<number>(indexValuesQueries.addIndexValues, [
            indexValues.meter_id,
            indexValues.date,
            indexValues.index_value]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("Index-values could not be added!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};

export function updateIndexValues(indexValues: IndexValues): Promise<number> {
    const promise = new Promise<number>((resolve,reject) => {
        execute<number>(indexValuesQueries.updateIndexValues, [
            indexValues.meter_id,
            indexValues.date,
            indexValues.index_value,
            indexValues.index_id]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("Index-values could not be updated!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
}

export function deleteIndexValues(id: IndexValues['index_id']): Promise<number> {
    const promise = new Promise<number>((resolve,reject) => {
        execute<number>(indexValuesQueries.deleteIndexValues, [id]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("Index-values could not be deleted!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
}