import {isEmail, isPassword, isPhoneNumber} from "./type-validation";

export class Customer {
    private _customerId: number;
    private _firstName: string;
    private _lastName: string;
    private _birthDate: Date;
    private _addressId: number;
    private _email: string;
    private _phoneNumber: string;
    private _password: string;
    private _gasType: string;
    private _electricityType: string;

    constructor(customerId: any, firstName: string, lastName: string, birthDate: Date, addressId: number, email: string, phoneNumber: string, password: string, gasType: string, electricityType: string) {
        this.customerId = customerId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.addressId = addressId;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.gasType = gasType;
        this.electricityType = electricityType;
    }

    get customerId(): number {
        return this._customerId;
    }

    set customerId(value: number) {
        this._customerId = value;
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
            throw new Error(value + " is not a valid email address [customer.email]");
        }

        this._email = value;
    }

    get phoneNumber(): string {
        return this._phoneNumber;
    }

    set phoneNumber(value: string) {
        if (!isPhoneNumber(value)) {
            throw new Error(value + " is not a valid phone number [customer.phoneNumber]");
        }

        this._phoneNumber = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        if (!isPassword(value)) {
            throw new Error("An invalid password was entered [customer.password]");
        }

        this._password = value;
    }

    get gasType(): string {
        return this._gasType;
    }

    set gasType(value: string) {
        this._gasType = value;
    }

    get electricityType(): string {
        return this._electricityType;
    }

    set electricityType(value: string) {
        this._electricityType = value;
    }

    toJSON = () => ({
        CustomerID: this.customerId,
        FirstName: this.firstName,
        LastName: this.lastName,
        BirthDate: this.birthDate,
        AdressID: this.addressId, // typo
        Email: this.email,
        PhoneNumber: this.phoneNumber,
        Password: this.password,
        GasType: this.gasType,
        Electricitytype: this.electricityType
    });
}
