import {execute} from "../utils/mysql.connector";
import {UserAddress} from '../classes/user-addresses';
import {userAdressQueries} from '../queries/user-address-queries';

export function getAllUserAddresses(): Promise<UserAddress[]> {
    const promise = new Promise<UserAddress[]>((resolve,reject) => {
        execute<UserAddress[]>(userAdressQueries.getAllUserAddresses, []).then((result) => {
            if(result)
                resolve(result);
            else
                reject("No user-addresses!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};

export function getAddressIdByUserId(id: UserAddress['user_id']): Promise<UserAddress[]> {
    const promise = new Promise<UserAddress[]>((resolve,reject) => {
        execute<UserAddress[]>(userAdressQueries.getAddressIdByUserId, [id]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("No user-addresses!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};

export function insertUserAddress(userAddress: UserAddress): Promise<number> {
    const promise = new Promise<number>((resolve,reject) => {
        execute<number>(userAdressQueries.addUserAddress, [
            userAddress.user_id,
            userAddress.address_id]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("User-addresse could not be added!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};

export const updateUserAddress = async (userAddress: UserAddress) => {
    const promise = new Promise<number>((resolve,reject) => {
        execute<number>(userAdressQueries.updateUserAddress, [
            userAddress.user_id,
            userAddress.address_id]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("User-addresse could not be updated!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
}

export function deleteUserAddress(id: UserAddress['user_id']): Promise<number> {
    const promise = new Promise<number>((resolve,reject) => {
        execute<number>(userAdressQueries.deleteUserAddress, [id]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("User-addresse could not be deleted!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
}