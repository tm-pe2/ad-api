import {execute} from "../utils/mysql.connector";
import {Customer} from "../classes/customer";
import {customerQueries} from "../queries/customer-queries";

export function getAllCustomers(): Promise<Customer[]> {
    const promise = new Promise<Customer[]>((resolve,reject) => {
        execute<Customer[]>(customerQueries.getAllCustomers, []).then((result) => {
            if(result)
                resolve(result);
            else
                reject("No customers!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};

export function getCustomerById(id: Customer['customer_id']): Promise<Customer> {
    const promise = new Promise<Customer>((resolve,reject) => {
        execute<Customer>(customerQueries.getCustomerById, [id]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("No customers!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};

export function getCustomerByUserId(id: Customer['user_id']): Promise<Customer> {
    const promise = new Promise<Customer>((resolve,reject) => {
        execute<Customer>(customerQueries.getCustomerByUserId, [id]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("No customers!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};

export function getCustomersContracts(): Promise<Customer[]> {
    const promise = new Promise<Customer[]>((resolve,reject) => {
        execute<Customer[]>(customerQueries.getCustomersContracts, []).then((result) => {
            if(result)
                resolve(result);
            else
                reject("No customers!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};

export function getCustomersContractsByID(id: Customer['customer_id']): Promise<Customer[]> {
    const promise = new Promise<Customer[]>((resolve,reject) => {
        execute<Customer[]>(customerQueries.getCustomersContractsByID, [id]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("No customers!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};

export function insertCustomer(customer: Customer): Promise<number> {
    const promise = new Promise<number>((resolve,reject) => {
        execute<number>(customerQueries.AddCustomer, [customer.user_id,
            customer.customer_type,]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("Customer could not be added!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};

export function updateCustomer(customer: Customer): Promise<number> {
    const promise = new Promise<number>((resolve,reject) => {
        execute<number>(customerQueries.updateCustomer, [customer.customer_type,
            customer.customer_id]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("Customer could not be updated!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};

export function deleteCustomer(id: Customer['customer_id']): Promise<number> {
    const promise = new Promise<number>((resolve,reject) => {
        execute<number>(customerQueries.DeleteCustomerById, [id]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("Customer could not be deleted!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};