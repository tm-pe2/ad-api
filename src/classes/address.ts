import * as validatior from '../classes/typeValidation';
import { Database } from '../classes/database';

export class Address {
    private AdressID: number = 0;
    private City: string = '';
    private Street: string = '';
    private HouseNumber: string = '';
    private PostalCode: string = '';
    private Country: string = '';

    constructor(city: string = 'default', street: string = 'default', hNumber: string = 'default', pCode: string = 'default', country: string = 'default', addID: number = 0 )
    {
        if( validatior.isString(city) && validatior.isString(street) && validatior.isString(hNumber) &&validatior.isString(pCode) && validatior.isString(country) && validatior.isID(addID))
        {
            this.AdressID = addID;
            this.City = city;
            this.Street = street;
            this.HouseNumber = hNumber;
            this.PostalCode = pCode;
            this.Country = country;
        }
    }

    //getters
    get getAddressID(): number
    {
        return this.AdressID;
    }

    get getCity(): string
    {
        return this.City;
    }

    get getStreet(): string
    {
        return this.Street;
    }

    get getHouseNumber(): string
    {
        return this.HouseNumber;
    }

    get getPostalCode(): string
    {
        return this.PostalCode;
    }

    get getCountry(): string
    {
        return this.Country;
    }

    //setters
    set setAdderssID(id: number)
    {
        if(validatior.isID(id))
        {
            this.AdressID = id;
        }
    }

    set setCity(city: string)
    {
        if(validatior.isString(city))
        {
            this.City = city;
        }
    }

    set setStreet(street: string)
    {
        if(validatior.isString(street))
        {
            this.Street = street;
        }
    }

    set setHouseNumber(hNum: string)
    {
        if(validatior.isString(hNum))
        {
            this.HouseNumber = hNum;
        }
    }

    set setPostalCode(pCode: string)
    {
        if(validatior.isString(pCode))
        {
            this.PostalCode = pCode;
        }
    }

    set setCountry(country: string)
    {
        if(validatior.isString(country))
        {
            this.Country = country;
        }
    }

    //methods

    toJSON()
    {
        return {
            AdressID: this.getAddressID,
            City: this.getCity,
            Street: this.getStreet,
            HouseNumber: this.getHouseNumber,
            PostalCode: this.getPostalCode,
            Country: this.getCountry
        }
    }

    async readAll(): Promise<Address[]>
    {
        let addresses: Address[] = [];
        let db = new Database();
        let conn = db.connect();

        let query: string = "Select * FROM address";

        await(new Promise((resolve, reject) => {
            conn.query(query, (err: Error, tmpAddresses: Address[]) => {
                if (err) reject(err);
                tmpAddresses.forEach(address => {
                    addresses.push(address);
                });
                resolve(tmpAddresses);
            });
        }));

        conn.destroy();
        return addresses;
    }

    async readAddress(id: number): Promise<Address>
    {
        let address = new Address();
        let db = new Database();
        let conn = db.connect();

        let query: string = "Select * FROM address Where AdressID = ?";
        await(new Promise((resolve, reject) => {
            let res = conn.query(query, [id], (err: unknown, a: Address) => {
                if (err) reject(err);
                address = a;
                resolve(a);
            });
        }));

        conn.destroy();
        return address;
    }

    async insert(): Promise<boolean>
    {
        let status: boolean = true;
        let db = new Database();
        let conn = db.connect();
        let query: string = `INSERT INTO address SET ?`;
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
        let query: string = `UPDATE address SET 
        City = ?,
        Street = ?,
        HouseNumber = ?,
        PostalCode = ?,
        Country = ? Where AdressID = ? `;
        await(new Promise((resolve, reject) => {
            let res = conn.query(query,
            [
                this.City,
                this.Street,
                this.HouseNumber,
                this.PostalCode,
                this.Country,
                this.AdressID
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
        let query: string = "DELETE FROM address Where AdressID = ?";

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
}