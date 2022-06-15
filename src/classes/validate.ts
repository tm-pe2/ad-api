import { Customer, CustomerType, Employee, User } from "../models/user";

class Validate {
    static checkEmail(email: string): void {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(email).toLowerCase()))
            throw new Error("Invalid email");
    }

    static checkPhone(phone: string): void {
        const re = /^\+?[0-9]{10,12}$/;
        if (!re.test(String(phone).toLowerCase()))
            throw new Error("Invalid phone number");
    }

    static checkName(name: string): void {
        const re = /^[a-zA-Zа-яА-ЯёЁ]+$/;
        if (!re.test(String(name).toLowerCase()))
            throw new Error("Invalid name");
    }

    static checkOlder(date: Date, age: 16 | 18): void {
        const now = new Date();
        const ageDiff = now.getFullYear() - date.getFullYear();
        if (ageDiff < age)
            throw new Error("User is too young, must be atleast " + age + " years old");
    }

    static checkNationalRegistryNumber(nationalRegistryNumber: string): void {
        const re = /^[0-9]{11}$/; // TODO: better regex
        if (!re.test(String(nationalRegistryNumber)))
            throw new Error("Invalid national registry number. Only supply /^[0-9]{11}$/");
    }
    
    static checkDate(date: Date): void {
        if (date.getFullYear() < 1900)
            throw new Error("Invalid date");
    }

    static checkSalary(salary: number): void {
        if (salary < 500 && salary > 10000)
            throw new Error("Invalid salary");
    }
}

export class ValidateInterface {
    static checkUser(user: User): void {
        Validate.checkEmail(user.email);
        Validate.checkPhone(user.phone_number);
        Validate.checkName(user.first_name);
        Validate.checkName(user.last_name);
        Validate.checkDate(user.birth_date);
        Validate.checkNationalRegistryNumber(user.national_registry_number);
    }
    
    static checkEmployee(employee: Employee): void {
        ValidateInterface.checkUser(employee);
        Validate.checkOlder(employee.birth_date, 16);
        Validate.checkSalary(employee.salary);
        Validate.checkDate(employee.hire_date);
    }
    
    static checkCustomer(customer: Customer): void {
        ValidateInterface.checkUser(customer);
        Validate.checkOlder(customer.birth_date, 18);
        if (customer.customer_type in CustomerType)
            throw new Error("Invalid customer type");
    }

}
