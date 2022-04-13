export class Tariff {
    private _tariffId: number;
    private _smallInd: number;
    private _mediumInd: number;
    private _bigInd: number;
    private _smallComp: number;
    private _mediumComp: number;
    private _bigComp: number;

    constructor(tariffId: any, smallInd: number, mediumInd: number, bigInd: number, smallComp: number, mediumComp: number, bigComp: number) {
        this.tariffId = tariffId;
        this.smallInd = smallInd;
        this.mediumInd = mediumInd;
        this.bigInd = bigInd;
        this.smallComp = smallComp;
        this.mediumComp = mediumComp;
        this.bigComp = bigComp;
    }

    get tariffId(): number {
        return this._tariffId;
    }

    set tariffId(value: number) {
        this._tariffId = value;
    }

    get smallInd(): number {
        return this._smallInd;
    }

    set smallInd(value: number) {
        this._smallInd = value;
    }

    get mediumInd(): number {
        return this._mediumInd;
    }

    set mediumInd(value: number) {
        this._mediumInd = value;
    }

    get bigInd(): number {
        return this._bigInd;
    }

    set bigInd(value: number) {
        this._bigInd = value;
    }

    get smallComp(): number {
        return this._smallComp;
    }

    set smallComp(value: number) {
        this._smallComp = value;
    }

    get mediumComp(): number {
        return this._mediumComp;
    }

    set mediumComp(value: number) {
        this._mediumComp = value;
    }

    get bigComp(): number {
        return this._bigComp;
    }

    set bigComp(value: number) {
        this._bigComp = value;
    }

    toJSON = () => ({
        TarifID: this.tariffId,
        SmallInd: this.smallInd,
        MediumInd: this.mediumInd,
        BigInd: this.bigInd,
        SmallComp: this.smallComp,
        MediumComp: this.mediumComp,
        BigComp: this.bigComp
    });
}
