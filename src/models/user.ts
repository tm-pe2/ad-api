import { Address } from "./address";

/** Role defining permission level of a user
 * These need to match up with the names in the database.
*/
export enum UserRole {
    CUSTOMER = 1,
    ADMIN = 3,
    SUPPLIER = 4,
    TECHNICIAN = 5,
    HR_MANAGER = 6,
    EMPLOYEE = 7,
    ACCOUNTANT = 8,
    SUPPORT = 9,
    MANAGER = 10,
}

export interface UserAddress {
    user_id: number;
    address_id: number;
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
    role_ids: UserRole[],
    addresses: Address[],
}

export interface Employee extends User {
    department: string, // id to other table?
    hire_date: Date,
    salary: number,
}

export interface Customer extends User {
    type: CustomerType
}
export interface RegisterCustomer {
    id: number,
    type: CustomerType
}

export enum CustomerType {
    PRIVATE = 1,
    COMPANY = 2
}

