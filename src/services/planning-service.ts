import {execute} from "../utils/mysql.connector";
import {Planning} from "../classes/planning";
import {planningQueries} from "../queries/planning-queries";

export function getAllPlannings(): Promise<Planning[]> {
    const promise = new Promise<Planning[]>((resolve,reject) => {
        execute<Planning[]>(planningQueries.getAllPlannings, []).then((result) => {
            if(result)
                resolve(result);
            else
                reject("No plannings!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};

export function getPlanningById(id: Planning['planning_id']): Promise<Planning> {
    const promise = new Promise<Planning>((resolve,reject) => {
        execute<Planning>(planningQueries.getPlanningById, [id]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("No plannings!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};

export function getPlanningByEmployeeId(id: Planning['employee_id']): Promise<Planning[]> {
    const promise = new Promise<Planning[]>((resolve,reject) => {
        execute<Planning[]>(planningQueries.getPlanningByEmployeeId, [id]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("No plannings!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};

export function insertPlanning(planning: Planning): Promise<number> {
    const promise = new Promise<number>((resolve,reject) => {
        execute<number>(planningQueries.addPlanning, [
            planning.employee_id,
            planning.contract_id,
            planning.date,
            planning.status]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("Planning could not be added!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};

export function updatePlanning(planning: Planning): Promise<number> {
    const promise = new Promise<number>((resolve,reject) => {
        execute<number>(planningQueries.updatePlanning, [
            planning.employee_id,
            planning.contract_id,
            planning.date,
            planning.status,
            planning.planning_id]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("Planning could not be updated!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};

export function deletePlanningById(id: Planning['planning_id']): Promise<number> {
    const promise = new Promise<number>((resolve,reject) => {
        execute<number>(planningQueries.deletePlanningById, [id]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("Planning could not be deleted!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};
