export class Supplier {
    private _supplierId: number;
    private _name: string;
    private _supplyType: string;
    private _companyName: string;
    private _addressId: number;

    constructor(supplierId: any, name: string, supplyType: string, companyName: string, addressId: number) {
        this.supplierId = supplierId;
        this.name = name;
        this.supplyType = supplyType;
        this.companyName = companyName;
        this.addressId = addressId;
    }

    get supplierId(): number {
        return this._supplierId;
    }

    set supplierId(value: number) {
        this._supplierId = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get supplyType(): string {
        return this._supplyType;
    }

    set supplyType(value: string) {
        this._supplyType = value;
    }

    get companyName(): string {
        return this._companyName;
    }

    set companyName(value: string) {
        this._companyName = value;
    }

    get addressId(): number {
        return this._addressId;
    }

    set addressId(value: number) {
        this._addressId = value;
    }

    toJSON = () => ({
        SupplierID: this.supplierId,
        Name: this.name,
        SupplyType: this.supplyType,
        companyName: this.companyName,
        AdressID: this.addressId
    });
}
