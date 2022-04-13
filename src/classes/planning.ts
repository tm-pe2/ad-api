export class Planning {
    private _planningId: number;
    private _employeeId: number;
    private _customerId: number;
    private _date: Date;
    private _status: number;

    constructor(planningId: any, employeeId: number, customerId: number, date: Date, status: number) {
        this.planningId = planningId;
        this.employeeId = employeeId;
        this.customerId = customerId;
        this.date = date;
        this.status = status;
    }

    get planningId(): number {
        return this._planningId;
    }

    set planningId(value: number) {
        this._planningId = value;
    }

    get employeeId(): number {
        return this._employeeId;
    }

    set employeeId(value: number) {
        this._employeeId = value;
    }

    get customerId(): number {
        return this._customerId;
    }

    set customerId(value: number) {
        this._customerId = value;
    }

    get date(): Date {
        return this._date;
    }

    set date(value: Date) {
        this._date = value;
    }

    get status(): number {
        return this._status;
    }

    set status(value: number) {
        this._status = value;
    }

    toJSON = () => ({
        PlanningID: this.planningId,
        EmployeeID: this.employeeId,
        CustomerID: this.customerId,
        Date: this.date,
        Status: this.status
    });
}
