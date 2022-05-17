import {execute} from "../utils/mysql.connector";
import {Consumption} from '../classes/consumption';
import {consumtionQueries} from '../queries/consumtion-queries';

export function getAllConsumptions(): Promise<Consumption[]>{
    const promise = new Promise<Consumption[]>((resolve,reject) => {
        execute<Consumption[]>(consumtionQueries.getAllConsumptions, []).then((result) => {
            if(result)
                resolve(result);
            else
                reject("No consumption");
        }).catch((error) => {
            console.log(error);
            reject(error);
        });
    });

    return promise;
};

export function getConsumptionById(id: Consumption['consumption_id']): Promise<Consumption> {
    const promise = new Promise<Consumption>((resolve,reject) => {
        execute<Consumption>(consumtionQueries.getConsumptionById, [id]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("No consumption");
        }).catch((error) => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
}

export function insertConsumption(consumption: Consumption): Promise<number> {
    const promise = new Promise<number>((resolve,reject) => {
        execute<number>(consumtionQueries.addConsumption, [
            consumption.meter_id,
            consumption.consumption,
            consumption.date]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("Consumption cloud not be added!");
        }).catch((error) => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};

export function updateConsumption(consumption: Consumption): Promise<number> {
    const promise = new Promise<number>((resolve,reject) => {
        execute<number>(consumtionQueries.updateConsumption, [
            consumption.meter_id,
            consumption.consumption,
            consumption.date,
            consumption.consumption_id]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("Consumption cloud not be updated!");
        }).catch((error) => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
}

export function deleteConsumption(id: Consumption['consumption_id']): Promise<number> {
    const promise = new Promise<number>((resolve,reject) => {
        execute<number>(consumtionQueries.deleteConsumptionById, [id]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("Consumption cloud not be deleted!");
        }).catch((error) => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
}