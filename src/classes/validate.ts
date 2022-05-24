import { Customer, Employee, User } from "../models/user";

export class Validate {
    static isEmail(email: string): boolean {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    static isPhone(phone: string): boolean {
        const re = /^\+?[0-9]{10,12}$/;
        return re.test(String(phone).toLowerCase());
    }

    static isName(name: string): boolean {
        const re = /^[a-zA-Zа-яА-ЯёЁ]+$/;
        return re.test(String(name).toLowerCase());
    }

    static isNameOrEmail(nameOrEmail: string): boolean {
        const re = /^[a-zA-Zа-яА-ЯёЁ]+$/;
        return re.test(String(nameOrEmail).toLowerCase());
    }

    static isOlder(date: Date, age: 16 | 18): boolean {
        const now = new Date();
        const ageDiff = now.getFullYear() - date.getFullYear();
        return ageDiff >= age;
    }

    static isNationalRegistryNumber(nationalRegistryNumber: string): boolean {
        const re = /^[0-9]{11}$/; // TODO: better regex
        return re.test(nationalRegistryNumber);
    }

    // Validate interfaces

    static isUser(user: User): boolean {
        return (
            this.isEmail(user.email) &&
            this.isPhone(user.phone_number) &&
            this.isName(user.first_name) &&
            this.isName(user.last_name) &&
            this.isNationalRegistryNumber(user.national_registry_number)
        );
    }

    static isEmployee(employee: Employee): boolean {
        return (
            this.isUser(employee) &&
            this.isName(employee.department) &&
            this.isOlder(employee.birth_date, 18)
        );
    }

    static isCustomer(customer: Customer): boolean {
        return (
            this.isUser(customer)
        );
    }

    

}
