import * as validator from '../classes/typeValidation';

export class Employee {
    private _employeeId: number;
    private _firstName: string;
    private _lastName: string;
    private _dateOfBirth: Date;
    private _addressId: number;
    private _email: string;
    private _phoneNumber: string;
    private _password: string;
    private _department: string;
    private _hireDate: Date;
    private _gender: string;
    private _permissions: string;

    constructor(employeeId: any, firstName: string, lastName: string, dateOfBirth: Date, addressId: number, email: string, phoneNumber: string, password: string, department: string, hireDate: Date, gender: string, permissions: string) {
        this.employeeId = employeeId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.addressId = addressId;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.department = department;
        this.hireDate = hireDate;
        this.gender = gender;
        this.permissions = permissions
    }


    get employeeId(): number {
        return this._employeeId;
    }

    set employeeId(value: number) {
        if (validator.isID(value))
            this._employeeId = value;
    }

    get firstName(): string {
        return this._firstName;
    }

    set firstName(value: string) {
        if (validator.isName(value))
            this._firstName = value;
    }

    get lastName(): string {
        return this._lastName;
    }

    set lastName(value: string) {
        if (validator.isName(value))
            this._lastName = value;
    }

    get dateOfBirth(): Date {
        return this._dateOfBirth;
    }

    set dateOfBirth(value: Date) {
        if (validator.isDate(value))
            this._dateOfBirth = value;
    }

    get addressId(): number {
        return this._addressId;
    }

    set addressId(value: number) {
        if (validator.isID(value))
            this._addressId = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        if (validator.isEmail(value))
            this._email = value;
    }

    get phoneNumber(): string {
        return this._phoneNumber;
    }

    set phoneNumber(value: string) {
        if (validator.isPhoneNumber(value))
            this._phoneNumber = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        if (validator.isPassword(value))
            this._password = value;
    }

    get department(): string {
        return this._department;
    }

    set department(value: string) {
        this._department = value;
    }

    get hireDate(): Date {
        return this._hireDate;
    }

    set hireDate(value: Date) {
        this._hireDate = value;
    }

    get gender(): string {
        return this._gender;
    }

    set gender(value: string) {
        this._gender = value;
    }

    get permissions(): string {
        return this._permissions;
    }

    set permissions(value: string) {
        this._permissions = value;
    }
}
