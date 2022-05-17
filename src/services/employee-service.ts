import {execute} from "../utils/mysql.connector";
import {Employee} from "../classes/employee";
import {employeeQueries} from "../queries/employee-queries";
import { func } from "joi";

export function getAllEmployees(): Promise<Employee[]> {
    const promise = new Promise<Employee[]>((resolve,reject) => {
        execute<Employee[]>(employeeQueries.getAllEmployees, []).then((result) => {
            if(result)
                resolve(result);
            else
                reject("No emloyees!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};

export function getEmployeeById(id: Employee['employee_id']): Promise<Employee> {
    const promise = new Promise<Employee>((resolve,reject) => {
        execute<Employee>(employeeQueries.getEmployeeById, [id]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("No emloyees!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};

export function insertEmployee(employee: Employee): Promise<number> {
    const promise = new Promise<number>((resolve,reject) => {
        execute<number>(employeeQueries.addEmployee, [
            employee.department,
            employee.permissions,
            employee.hire_date,
            employee.gender,
            employee.salary,
            employee.user_id]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("Emloyee could not be added!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};

export function updateEmployee(employee: Employee): Promise<number> {
    const promise = new Promise<number>((resolve,reject) => {
        execute<number>(employeeQueries.updateEmployees, [
            employee.department,
            employee.permissions,
            employee.hire_date,
            employee.gender,
            employee.salary,
            employee.employee_id]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("Emloyee could not be updated!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};

export function deleteEmployeeById(id: Employee['employee_id']): Promise<number> {
    const promise = new Promise<number>((resolve,reject) => {
        execute<number>(employeeQueries.deleteEmployeeById, [id]).then((result) => {
            if(result)
                resolve(result);
            else
                reject("Emloyee could not be deleted!");
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
    
    return promise;
};
