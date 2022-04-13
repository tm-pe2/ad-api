export class Invoice {
    private _invoiceId: number;
    private _customerId: number;
    private _supplierId: number;
    private _date: Date;
    private _dueDate: Date;
    private _status: string;
    private _gasAmount: number;
    private _electricityType: string;
    private _price: number;
    private _tax: number;
    private _startDate: Date;
    private _endDate: Date;

    constructor(invoiceId: any, customerId: number, supplierId: number, date: Date, dueDate: Date, status: string, gasAmount: number, electricityType: string, price: number, tax: number, startDate: Date, endDate: Date) {
        this.invoiceId = invoiceId;
        this.customerId= customerId;
        this.supplierId = supplierId;
        this.date = date;
        this.dueDate = dueDate;
        this.status = status;
        this.gasAmount = gasAmount;
        this.electricityType = electricityType;
        this.price = price;
        this.tax = tax;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    get invoiceId(): number {
        return this._invoiceId;
    }

    set invoiceId(value: number) {
        this._invoiceId = value;
    }

    get customerId(): number {
        return this._customerId;
    }

    set customerId(value: number) {
        this._customerId = value;
    }

    get supplierId(): number {
        return this._supplierId;
    }

    set supplierId(value: number) {
        this._supplierId = value;
    }

    get date(): Date {
        return this._date;
    }

    set date(value: Date) {
        this._date = value;
    }

    get dueDate(): Date {
        return this._dueDate;
    }

    set dueDate(value: Date) {
        this._dueDate = value;
    }

    get status(): string {
        return this._status;
    }

    set status(value: string) {
        this._status = value;
    }

    get gasAmount(): number {
        return this._gasAmount;
    }

    set gasAmount(value: number) {
        this._gasAmount = value;
    }

    get electricityType(): string {
        return this._electricityType;
    }

    set electricityType(value: string) {
        this._electricityType = value;
    }

    get price(): number {
        return this._price;
    }

    set price(value: number) {
        this._price = value;
    }

    get tax(): number {
        return this._tax;
    }

    set tax(value: number) {
        this._tax = value;
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
        InvoiceID: this.invoiceId,
        CustomerID: this.customerId,
        SupplierID: this.supplierId,
        Date: this.date,
        DueDate: this.dueDate,
        Status: this.status,
        GasAmount: this.gasAmount,
        Electricitytype: this.electricityType,
        Price: this.price,
        Tax: this.tax,
        StartDate: this.startDate,
        EndDate: this.endDate
    });
}
