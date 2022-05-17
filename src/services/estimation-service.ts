import {execute} from "../utils/mysql.connector";
import {Estimation} from "../classes/estimation";
import {estimationQueries} from "../queries/estimation-queries";

export function getAllEstimations(): Promise<Estimation[]> {
    const promise = new Promise<Estimation[]>((resolve,reject) => {
        execute<Estimation[]>(estimationQueries.getAllEstimations, []).then((result) => {
            if(result)
                resolve(result);
            else
                reject("No estomations!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};

export function getEstimationById(id: Estimation['estimation_id']): Promise<Estimation> {
    const promise = new Promise<Estimation>((resolve,reject) => {
        execute<Estimation>(estimationQueries.getEstimationById, [id]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("No estomations!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};

export function getEstimationByCustomerId(id: number): Promise<Estimation> {
    const promise = new Promise<Estimation>((resolve,reject) => {
        execute<Estimation>(estimationQueries.getEstimationByCustomerID, [id]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("No estomations!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};


export function insertEstimation(estimation: Estimation): Promise<number>{
    const promise = new Promise<number>((resolve,reject) => {
        execute<number>(estimationQueries.addEstimation, [
        estimation.service_type,
        estimation.address_id,
        estimation.building_type,
        estimation.family_size,
        estimation.past_consumption,
        estimation.equipments,
        estimation.estimated_consumption]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("Estomation could not be added!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};

export function updateEstimation(estimation: Estimation): Promise<number> {
    const promise = new Promise<number>((resolve,reject) => {
        execute<number>(estimationQueries.updateEstimation, [
        estimation.service_type,
        estimation.address_id,
        estimation.building_type,
        estimation.family_size,
        estimation.past_consumption,
        estimation.equipments,
        estimation.estimated_consumption,
        estimation.estimation_id]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("Estomation could not be updated!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};

export function deleteEstimationById(id: Estimation['estimation_id']): Promise<number> {
    const promise = new Promise<number>((resolve,reject) => {
        execute<number>(estimationQueries.deleteEstimationById, [id]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("Estomation could not be added!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};
