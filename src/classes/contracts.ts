export class Contract {
    private _contractId: number;
    private _startDate: Date;
    private _endDate: Date;
    private _customerId: number;
    private _customerType: string;
    private _advancedPayment: number;
    private _price: number;
    private _tariffId : number;
    private _estimatedId: number;

    constructor(contractId: any, startDate: Date, endDate: Date, customerId: number, customerType: string, advancedPayment: number, price: number, tariffId: number, estimatedId: number) {
        this.contractId = contractId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.customerId = customerId;
        this.customerType = customerType;
        this.advancedPayment = advancedPayment;
        this.price = price;
        this.tariffId = tariffId;
        this.estimatedId = estimatedId
    }

    get contractId(): number {
        return this._contractId;
    }

    set contractId(value: number) {
        this._contractId = value;
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

    get customerId(): number {
        return this._customerId;
    }

    set customerId(value: number) {
        this._customerId = value;
    }

    get customerType(): string {
        return this._customerType;
    }

    set customerType(value: string) {
        this._customerType = value;
    }

    get advancedPayment(): number {
        return this._advancedPayment;
    }

    set advancedPayment(value: number) {
        this._advancedPayment = value;
    }

    get price(): number {
        return this._price;
    }

    set price(value: number) {
        this._price = value;
    }

    get tariffId(): number {
        return this._tariffId;
    }

    set tariffId(value: number) {
        this._tariffId = value;
    }

    get estimatedId(): number {
        return this._estimatedId;
    }

    set estimatedId(value: number) {
        this._estimatedId = value;
    }

    toJSON = () => ({
        ContractID: this.contractId,
        StartDate: this.startDate,
        EndDate: this.endDate,
        CustomerID: this.customerId,
        CustomerType: this.customerType,
        AdvancedPayement: this.advancedPayment,
        Price: this.price,
        TarifID: this.tariffId,
        EstimatedID: this.estimatedId
    });
}
