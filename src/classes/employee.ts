import {isEmail, isPassword, isPhoneNumber} from './type-validation';

export class Employee {
    private _employeeId: number;
    private _firstName: string;
    private _lastName: string;
    private _birthDate: Date;
    private _addressId: number;
    private _email: string;
    private _phoneNumber: string;
    private _password: string;
    private _department: string;
    private _permissions: number;
    private _hireDate: Date;
    private _gender: number;

    constructor(employeeId: any, firstName: string, lastName: string, birthDate: Date, addressId: number, email: string, phoneNumber: string, password: string, department: string, permissions: number, hireDate: Date, gender: number) {
        this.employeeId = employeeId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.addressId = addressId;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.department = department;
        this.permissions = permissions;
        this.hireDate = hireDate;
        this.gender = gender;
    }

    get employeeId(): number {
        return this._employeeId;
    }

    set employeeId(value: number) {
        this._employeeId = value;
    }

    get firstName(): string {
        return this._firstName;
    }

    set firstName(value: string) {
        this._firstName = value;
    }

    get lastName(): string {
        return this._lastName;
    }

    set lastName(value: string) {
        this._lastName = value;
    }

    get birthDate(): Date {
        return this._birthDate;
    }

    set birthDate(value: Date) {
        this._birthDate = value;
    }

    get addressId(): number {
        return this._addressId;
    }

    set addressId(value: number) {
        this._addressId = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        if (!isEmail(value)) {
            throw new Error(value + " is not a valid email address [employee.email]");
        }

        this._email = value;
    }

    get phoneNumber(): string {
        return this._phoneNumber;
    }

    set phoneNumber(value: string) {
        if (!isPhoneNumber(value)) {
            throw new Error(value + " is not a valid phone number [employee.phoneNumber]");
        }

        this._phoneNumber = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        if (!isPassword(value)) {
            throw new Error("An invalid password was entered [employee.password]");
        }

        this._password = value;
    }

    get department(): string {
        return this._department;
    }

    set department(value: string) {
        this._department = value;
    }

    get permissions(): number {
        return this._permissions;
    }

    set permissions(value: number) {
        this._permissions = value;
    }

    get hireDate(): Date {
        return this._hireDate;
    }

    set hireDate(value: Date) {
        this._hireDate = value;
    }

    get gender(): number {
        return this._gender;
    }

    set gender(value: number) {
        this._gender = value;
    }

    toJSON = () => ({
        FirstName: this.firstName,
        LastName: this.lastName,
        BirthDate: this.birthDate,
        Email: this.email,
        PhoneNumber: this.phoneNumber,
        AdressID: this.addressId,
        Departement: this.department,
        Permissions: this.permissions,
        HireDate: this.hireDate,
        Gender: this.gender,
        Password: this.password
    });
}
