import * as validator from '../classes/typeValidation'

export class Contract {
    private ContractID: number = 0;
    private StartDate: Date = new Date();
    private EndDate: Date = new Date();
    private ClientID: number = 0;
    private ClientType: string = '';
    private AdvancedPayment: number = 0;
    private Price: number = 0;

    constructor(strDate = new Date('1990-01-01'), endDate = new Date('1990-01-01'), clientID: number = 0, clientType: string = 'default', adPayment: number = 0, price: number = 0, contractID: number = 0) {
        if (validator.isDate(strDate) && validator.isDate(endDate) && validator.isID(clientID) && validator.isName(clientType) && validator.isID(adPayment) && validator.isID(price) && validator.isID(contractID)) {
            this.ContractID = contractID;
            this.StartDate = strDate;
            this.EndDate = endDate;
            this.ClientID = clientID;
            this.ClientType = clientType;
            this.AdvancedPayment = adPayment;
            this.Price = price;
        }
    }

    //getters
    get getContractID(): number {
        return this.ContractID;
    }

    get getStartDate(): Date {
        return this.StartDate;
    }

    get getEndDate(): Date {
        return this.EndDate;
    }

    get getClientID(): number {
        return this.ClientID;
    }

    get getClientType(): string {
        return this.ClientType;
    }

    get getAdvancedPayment(): number {
        return this.AdvancedPayment;
    }

    get getPrice(): number {
        return this.Price;
    }

    //setters
    set setContractID(id: number) {
        if (validator.isID(id)) {
            this.ContractID = id;
        }
    }

    set setStartDate(date: Date) {
        if (validator.isDate(date)) {
            this.StartDate = date;
        }
    }

    set setEndDate(date: Date) {
        if (validator.isDate(date)) {
            this.EndDate = date;
        }
    }

    set setClientID(id: number) {
        if (validator.isID(id)) {
            this.ClientID = id;
        }
    }

    set setClientType(type: string) {
        if (validator.isString(type)) {
            this.ClientType = type;
        }
    }

    set setAdvancedPayment(adPay: number) {
        if (validator.isID(adPay)) {
            this.AdvancedPayment = adPay;
        }
    }

    set setPrice(price: number) {
        if (validator.isID(price)) {
            this.Price = price;
        }
    }

    /*
    toJSON()
    {
        return {
            StartDate: this.getStartDate,
            EndDate: this.getEndDate,
            ClientID: this.getClientID,
            ClientType: this.getClientType,
            AdvancedPayement: this.getAdvancedPayment,
            Price: this.getPrice
        }
    }

    /*
    async readAll(): Promise<Contract[]>
    {
        let contracts: Contract[] = [];
        let db = new Database();
        let conn = db.connect();

        let query: string = "Select * FROM clientcontracts";

        await(new Promise((resolve, reject) => {
            conn.query(query, (err: Error, tmpContracts: Contract[]) => {
                if (err) reject(err);
                tmpContracts.forEach(contract => {
                    contracts.push(contract);
                });
                resolve(tmpContracts);
            });
        }));

        conn.destroy();
        console.log(contracts);
        return contracts;
    }

    async readContract(id: number): Promise<Contract>
    {
        let contract = new Contract();
        let db = new Database();
        let conn = db.connect();

        let query: string = "Select * FROM clientcontracts Where ContractID = ?";
        await(new Promise((resolve, reject) => {
            conn.query(query, [id], (err: unknown, c: Contract) => {
                if (err) reject(err);
                contract = c
                resolve(c);
            });
        }));

        conn.destroy();
        return contract;
    }

    async insert(): Promise<boolean>
    {
        let status: boolean = true;
        let db = new Database();
        let conn = db.connect();
        let query: string = `INSERT INTO clientcontracts SET ?`;
        await(new Promise((resolve, reject) => {
            conn.query(query, this.toJSON() , (err: unknown) => {
                if (err) reject(err);
                status = true;
                resolve(status);
            });
        }));

        conn.destroy();
        return status;
    }

    async update(): Promise<boolean>
    {
        let status: boolean = true;
        let db = new Database();
        let conn = db.connect();
        let query: string = `UPDATE clientcontracts SET 
        StartDate = ?,
        EndDate = ?,
        ClientID = ?,
        ClientType = ?,
        AdvancedPayement = ?,
        Price = ?  Where ContractID = ? `;
        await(new Promise((resolve, reject) => {
            let res = conn.query(query,
            [
                this.StartDate,
                this.EndDate,
                this.ClientID,
                this.ClientType,
                this.AdvancedPayment,
                this.Price,
                this.ContractID
            ]
            , (err: unknown) => {
                if (err) reject(err);
                status = true;
                resolve(status);
            });
        }));

        conn.destroy();
        return status;
    }

    async delete(id: number): Promise<boolean>
    {
        let status: boolean = true;
        let db = new Database();
        let conn = db.connect();
        let query: string = "DELETE FROM clientcontracts Where ContractID = ?";

        await(new Promise((resolve, reject) => {
            conn.query(query, id ,(err: unknown) => {
                if (err) reject(err);
                status = true;
                resolve(status);
            });
        }));

        conn.destroy();
        return status;
    }
     */
}
