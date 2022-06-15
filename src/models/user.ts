import { Address } from "./address";

/** Role defining permission level of a user
 * These need to match up with the names in the database.
*/
export enum UserRole {
    CUSTOMER = 1,
    SUPPLIER = 2,
    EMPLOYEE = 3,
    ACCOUNTANT = 4,
    TECHNICIAN = 5,
    SUPPORT = 6,
    MANAGER = 7,
    HR_MANAGER = 8,
    ADMIN = 9,
}

export interface RegisterUser extends User{
    password: string;
}

export interface User {
    id?: number,
    first_name: string,
    last_name: string,
    birth_date: Date,
    email: string,
    phone_number: string,
    national_registry_number: string,
    roles?: UserRole[],
    addresses?: Address[],
    password?: string,
    active?: boolean,
}

export interface Employee extends User {
    hire_date: Date,
    salary: number,
}

export interface Customer extends User {
    customer_type: CustomerType
}

export enum CustomerType {
    PRIVATE = 1,
    COMPANY = 2
}

export interface UserAuthInfo {
    id: number,
    email: string,
    password: string,
    roles: UserRole[]
}

export interface UserIdRole {
    id: number,
    role: UserRole
}
