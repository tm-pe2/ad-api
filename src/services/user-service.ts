import {execute} from "../utils/mysql.connector";
import {User} from "../classes/user";
import {userQueries} from "../queries/users-queries";

export function getAllUsers(): Promise<User[]> {
    const promise = new Promise<User[]>((resolve,reject) => {
        execute<User[]>(userQueries.getAllUsers, []).then((result) => {
            if(result)
                resolve(result);
            else
                reject("No users!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};

export function getUserById(id: User['user_id']): Promise<User> {
    const promise = new Promise<User>((resolve,reject) => {
        execute<User>(userQueries.getUserById, [id]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("No users!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};


export function getUserByEmail(email: User['email']): Promise<User> {
    const promise = new Promise<User>((resolve,reject) => {
        execute<User>(userQueries.getUserByEmail, [email]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("No users!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};


export function getUserByNationalNumber(nationalNumber: User['email']): Promise<User> {
    const promise = new Promise<User>((resolve,reject) => {
        execute<User>(userQueries.getUserByNationalNumber, [nationalNumber]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("No users!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};

export function addUser(user: User): Promise<number> {
    const promise = new Promise<number>((resolve,reject) => {
        execute<number>(userQueries.AddUser, [
            user.role_id,
            user.first_name,
            user.last_name,
            user.birth_date,
            user.email,
            user.phone_number,
            user.password,
            user.national_registry_number]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("User could not be added!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};

export function updateUser(user: User): Promise<number> {
    const promise = new Promise<number>((resolve,reject) => {
        execute<number>(userQueries.UpdateUser, [
            user.role_id,
            user.first_name,
            user.last_name,
            user.birth_date,
            user.email,
            user.phone_number,
            user.password,
            user.national_registry_number,
            user.user_id]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("User could not be updated!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};

export function deleteUser(id: User['user_id']): Promise<number> {
    const promise = new Promise<number>((resolve,reject) => {
        execute<number>(userQueries.DeleteUserById, [id]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("User could not be deleted!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};
