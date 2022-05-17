import {execute} from "../utils/mysql.connector";
import {Contract} from "../classes/contracts";
import {contractQueries} from "../queries/contract-queries";

export function getAllContracts(): Promise<Contract[]> {
    const promise = new Promise<Contract[]>((resolve,reject) => {
        execute<Contract[]>(contractQueries.getAllContracts, []).then((result) => {
            if(result)
                resolve(result);
            else
                reject("No contract!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};

export function getContractById(id: Contract['contract_id']): Promise<Contract> {
    const promise = new Promise<Contract>((resolve,reject) => {
        execute<Contract>(contractQueries.getContractById, [id]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("No contract!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};

export function getContractsByCustomerAndAddressID(customerID: number,serviceType: Contract['service_type'],addressID: Contract['address_id'], endDate: Contract['end_date']): Promise<Contract> {
    const promise = new Promise<Contract>((resolve,reject) => {
        execute<Contract>(contractQueries.getContractByCustomerAndAddressID, [customerID,serviceType,addressID,endDate]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("No contract!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};

export function insertContract(contract: Contract): Promise<number> {
    const promise = new Promise<number>((resolve,reject) => {
        execute<number>(contractQueries.addContract, [
            contract.start_date,
            contract.end_date,
            contract.customer_type,
            contract.tariff_id,
            contract.estimation_id,
            contract.address_id,
            contract.service_type,
            contract.status]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("Contract could not be added!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};

export function updateContract(contract: Contract): Promise<number> {
    const promise = new Promise<number>((resolve,reject) => {
        execute<number>(contractQueries.updateContract, [
            contract.start_date,
            contract.end_date,
            contract.customer_type,
            contract.tariff_id,
            contract.estimation_id,
            contract.address_id,
            contract.service_type,
            contract.status,
            contract.contract_id]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("Contract could not be updated!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};

export function deleteContract(id: Contract['contract_id']): Promise<number> {
    const promise = new Promise<number>((resolve,reject) => {
        execute<number>(contractQueries.deleteContractById, [id]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("Contract could not be deleted!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};
