import {execute} from "../utils/mysql.connector";
import {Tariff} from "../classes/tariff";
import {tariffQueries} from "../queries/tariff-queries";

export function getAllTariffs(): Promise<Tariff[]> {
    const promise = new Promise<Tariff[]>((resolve,reject) => {
        execute<Tariff[]>(tariffQueries.getAllTariffs, []).then((result) => {
            if(result)
                resolve(result);
            else
                reject("No tariffs!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};

export function getTariffById(id: Tariff['tariff_id']): Promise<Tariff> {
    const promise = new Promise<Tariff>((resolve,reject) => {
        execute<Tariff>(tariffQueries.getTariffById, [id]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("No tariffs!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};

export function insertTariff(tariff: Tariff): Promise<number> {
    const promise = new Promise<number>((resolve,reject) => {
        execute<number>(tariffQueries.addTariff, [
            tariff.customer_type,
            tariff.value]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("Tariff could not be added!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};

export function updateTariff(tariff: Tariff): Promise<number> {
    const promise = new Promise<number>((resolve,reject) => {
        execute<number>(tariffQueries.updateTariff, [
            tariff.customer_type,
            tariff.value,
            tariff.tariff_id]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("Tariff could not be updated!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};

export function deleteTariffById(id: Tariff['tariff_id']): Promise<number> {
    const promise = new Promise<number>((resolve,reject) => {
        execute<number>(tariffQueries.deleteTariffById, [id]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("Tariff could not be deleted!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};
