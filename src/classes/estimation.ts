export class Estimation {
    private _estimationId: number;
    private _serviceType: string;
    private _addressId: number;
    private _buildingType: string;
    private _familySize: number;
    private _pastConsumption: number;
    private _electricCar: number;
    private _wellness: string;
    private _heatingType: string;

    constructor(estimationId: any, serviceType: string, addressId: number, buildingType: string, familySize: number, pastConsumption: number, electricCar: number, wellness: string, heatingType: string) {
        this.estimationId = estimationId;
        this.serviceType = serviceType;
        this.addressId = addressId;
        this.buildingType = buildingType;
        this.familySize = familySize;
        this.pastConsumption = pastConsumption;
        this.electricCar = electricCar;
        this.wellness = wellness;
        this.heatingType = heatingType;
    }

    get estimationId(): number {
        return this._estimationId;
    }

    set estimationId(value: number) {
        this._estimationId = value;
    }

    get serviceType(): string {
        return this._serviceType;
    }

    set serviceType(value: string) {
        this._serviceType = value;
    }

    get addressId(): number {
        return this._addressId;
    }

    set addressId(value: number) {
        this._addressId = value;
    }

    get buildingType(): string {
        return this._buildingType;
    }

    set buildingType(value: string) {
        this._buildingType = value;
    }

    get familySize(): number {
        return this._familySize;
    }

    set familySize(value: number) {
        this._familySize = value;
    }

    get pastConsumption(): number {
        return this._pastConsumption;
    }

    set pastConsumption(value: number) {
        this._pastConsumption = value;
    }

    get electricCar(): number {
        return this._electricCar;
    }

    set electricCar(value: number) {
        this._electricCar = value;
    }

    get wellness(): string {
        return this._wellness;
    }

    set wellness(value: string) {
        this._wellness = value;
    }

    get heatingType(): string {
        return this._heatingType;
    }

    set heatingType(value: string) {
        this._heatingType = value;
    }

    toJSON = () => ({
        EstimatedID: this.estimationId,
        ServiceType: this.serviceType,
        AdressID: this.addressId,
        BuildingType: this.buildingType,
        FamilySize: this.familySize,
        PastConsumption: this.pastConsumption,
        ElectricCar: this.electricCar,
        Welness: this.wellness,
        HeatingType: this.heatingType,
    });
}
