import {execute} from "../utils/mysql.connector";
import {CustomerContracts} from '../classes/customer-contracts';
import {customerContractsQueries} from '../queries/customer-contracts-queries';

export function getAllCustomersContracts(): Promise<CustomerContracts[]> {
    const promise = new Promise<CustomerContracts[]>((resolve,reject) => {
        execute<CustomerContracts[]>(customerContractsQueries.getAllCustomerContracts, []).then((result) => {
            if(result)
                resolve(result);
            else
                reject("No customer-contract!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};

export function getContractsByCustomerId(id: CustomerContracts['customer_id']): Promise<CustomerContracts> {
    const promise = new Promise<CustomerContracts>((resolve,reject) => {
        execute<CustomerContracts>(customerContractsQueries.getContractsByCustomerId, [id]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("No customer-contract!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};

export function insertCustomerContract(customerContract: CustomerContracts): Promise<number> {
    const promise = new Promise<number>((resolve,reject) => {
        execute<number>(customerContractsQueries.addCustomerContract, [customerContract.customer_id,
            customerContract.contract_id]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("Customer-contract could not be added!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};

export function updateCustomerContract(customerContract: CustomerContracts): Promise<number> {
    const promise = new Promise<number>((resolve,reject) => {
        execute<number>(customerContractsQueries.updateCustomerContract, [customerContract.customer_id,
            customerContract.contract_id]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("Customer-contract could not be updated!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
}

export function deleteCustomerContract(id: CustomerContracts['contract_id']): Promise<number> {
    const promise = new Promise<number>((resolve,reject) => {
        execute<number>(customerContractsQueries.addCustomerContract, [id]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("Customer-contract could not be deleted!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
}