import {execute} from "../utils/mysql.connector";
import {ContractMeters} from '../classes/contract-meters';
import {contractMetersQueries} from '../queries/contract-meters-queries';

export function getAllContractMeters(): Promise<ContractMeters[]> {
    const promise = new Promise<ContractMeters[]>((resolve,reject) => {
        execute<ContractMeters[]>(contractMetersQueries.getAllContractMeters, []).then((result) => {
            if(result)
                resolve(result);
            else
                reject("No contract-meters!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};

export function getContractMetersById(id: ContractMeters['contract_id']): Promise<ContractMeters> {
    const promise = new Promise<ContractMeters>((resolve,reject) => {
        execute<ContractMeters>(contractMetersQueries.getContractMetersByID, [id]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("No contract-meters!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};

export function insertContractMeters(contractMeter: ContractMeters): Promise<number> {
    const promise = new Promise<number>((resolve,reject) => {
        execute<number>(contractMetersQueries.addContractMeters, [contractMeter.contract_id,
            contractMeter.meter_id]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("Contract-meter could not be added!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};

export function updateContractMeters(contractMeter: ContractMeters): Promise<number> {
    const promise = new Promise<number>((resolve,reject) => {
        execute<number>(contractMetersQueries.UpdateContractMeters, [contractMeter.contract_id,
            contractMeter.meter_id]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("Contract-meter could not be updated!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
}

export function deleteContractMeters(contractID: ContractMeters['contract_id'], meterID: ContractMeters['meter_id']): Promise<number> {
    const promise = new Promise<number>((resolve,reject) => {
        execute<number>(contractMetersQueries.deleteContractMetersByIDs, [contractID,meterID]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("Contract-meter could not be deleted!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
}