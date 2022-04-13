export class Address {
    private _addressId: number;
    private _city: string;
    private _street: string;
    private _houseNumber: string;
    private _postalCode: string;
    private _country: string;
    private _startDate: Date;
    private _endDate: Date;

    constructor(addressId: any, city: string, street: string, houseNumber: string, postalCode: string, country: string, startDate: Date, endDate: Date) {
        this.addressId = addressId;
        this.city = city;
        this.street = street;
        this.houseNumber = houseNumber;
        this.postalCode = postalCode;
        this.country = country;
        this.startDate = startDate;
        this.endDate = endDate
    }

    get addressId(): number {
        return this._addressId;
    }

    set addressId(value: number) {
        this._addressId = value;
    }

    get city(): string {
        return this._city;
    }

    set city(value: string) {
        this._city = value;
    }

    get street(): string {
        return this._street;
    }

    set street(value: string) {
        this._street = value;
    }

    get houseNumber(): string {
        return this._houseNumber;
    }

    set houseNumber(value: string) {
        this._houseNumber = value;
    }

    get postalCode(): string {
        return this._postalCode;
    }

    set postalCode(value: string) {
        this._postalCode = value;
    }

    get country(): string {
        return this._country;
    }

    set country(value: string) {
        this._country = value;
    }

    get startDate(): Date {
        return this._startDate;
    }

    set startDate(value: Date) {
        this._startDate = value;
    }

    get endDate(): Date {
        return this._endDate;
    }

    set endDate(value: Date) {
        this._endDate = value;
    }

    toJSON = () => ({
        AdressID: this.addressId, // typo
        City: this.city,
        Street: this.street,
        HouseNumber: this.houseNumber,
        PostalCode: this.postalCode,
        Country: this.country,
        StartDate: this.startDate,
        EndDate: this.endDate
    });
}
