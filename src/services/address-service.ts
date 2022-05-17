import {execute} from "../utils/mysql.connector";
import {Address} from "../classes/address";
import {addressQueries} from "../queries/address-queries";

export function getAllAddresses(): Promise<Address[]> {
    const promise = new Promise<Address[]>((resolve,reject) => {
        execute<Address[]>(addressQueries.getAllAddresses, []).then((result) => {
            if(result)
                resolve(result);
            else
                reject("No address!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};

export function getAddressById(id: Address['address_id']): Promise<Address> {
    const promise = new Promise<Address>((resolve,reject) => {
        execute<Address>(addressQueries.getAddressById, [id]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("No address!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    })
    
    return promise;
};

export function getAddressByDetails(city: Address['city'], street: Address['street'], huose_number: Address['house_number'], postal_code: Address['postal_code'], country: Address['country']): Promise<Address> {
    const promise = new Promise<Address>((resolve,reject) => {
        execute<Address>(addressQueries.getAddressByDetails, [city,street,huose_number,postal_code,country]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("No address!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    })
    
    return promise;
};

export function insertAddress(address: Address): Promise<number> {
    const promise = new Promise<number>((resolve,reject) => {
        execute<number>(addressQueries.addAddress, [address.city,
            address.street,
            address.house_number,
            address.postal_code,
            address.country]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("Address could not be added!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    })
    
    return promise;
};

export function updateAddress(address: Address): Promise<number> {
    const promise = new Promise<number>((resolve,reject) => {
        execute<number>(addressQueries.updateAddress, [address.city,
            address.street,
            address.house_number,
            address.postal_code,
            address.country,
            address.address_id]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("Address could not be updated!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    })
    
    return promise;
};

export function deleteAddressById(id: Address['address_id']): Promise<number> {
    const promise = new Promise<number>((resolve,reject) => {
        execute<number>(addressQueries.deleteAddressById, [id]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("Address could not be deleted!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    })
    
    return promise;
};
