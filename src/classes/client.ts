import { Database } from '../classes/database';
import { Validation } from '../classes/typeValidation';

export class Client
{
    private validator = new Validation();
    private _ClientID: number = 0;
    private _Firstname: string = '';
    private _Lastname: string = '';
    private _Birthdate: Date = new Date;
    private _AddressID: number = 0;
    private _Email: string = '';
    private _PhoneNumber: string = '';
    private _Password: string = '';

    constructor(){}

    constructorInsert(fName: string, lName: string, bDate: Date, addID: number, email: string, pNumber: string, password: string)
    {
        if( this.validator.isName(fName) && this.validator.isName(lName) && this.validator.isDate(bDate) && this.validator.isID(addID) && this.validator.isEmail(email) && this.validator.isPhoneNumber(pNumber) && this.validator.isPassword(password) )
        {
            this._Firstname = fName;
            this._Lastname = lName;
            this._Birthdate = bDate;
            this._AddressID = addID;
            this._Email = email;
            this._PhoneNumber = pNumber;
            this._Password = password;
        }
        else
        {
            console.log("Input not valid!");
        }
    }

    constructorRead(id: number, fName: string, lName: string, bDate: Date, addID: number, email: string, pNumber: string, password: string)
    {
        if( this.validator.isID(id) && this.validator.isName(fName) && this.validator.isName(lName) && this.validator.isDate(bDate) && this.validator.isID(addID) && this.validator.isEmail(email) && this.validator.isPhoneNumber(pNumber) && this.validator.isPassword(password) )
        {
            this._ClientID = id;
            this._Firstname = fName;
            this._Lastname = lName;
            this._Birthdate = bDate;
            this._AddressID = addID;
            this._Email = email;
            this._PhoneNumber = pNumber;
            this._Password = password;
        }
        else
        {
            console.log("Input not valid!");
        }
    }

    // getters
    get ClientID(): number
    {
        return this._ClientID;
    }

    get FirstName(): string
    {
        return this._Firstname;
    }

    get LastName(): string
    {
        return this._Lastname;
    }

    get BirthDate(): Date
    {
        return this._Birthdate;
    }

    get AddressID(): number
    {
        return this._AddressID;
    }

    get Email(): string
    {
        return this._Email;
    }

    get PhoneNumber(): string
    {
        return this._PhoneNumber;
    }

    get Password(): string
    {
        return this._Password;
    }


    //setters
    //should be used carefully
    set setClientID(id: number)
    {
        if(this.validator.isID(id))
        {
            this._ClientID = id;
        }
    }

    set setFirstname(fName: string)
    {
        if(this.validator.isName(fName))
        {
            this._Firstname = fName;
        }
    }

    set setLastname(lName: string)
    {
        if(this.validator.isName(lName))
        {
            this._Lastname = lName;
        }
    }

    set setBirthdate(bDate: Date)
    {
        if(this.validator.isDate(bDate))
        {
            this._Birthdate = bDate;
        }
    }

    set setAddressID(id: number)
    {
        if(this.validator.isID(id))
        {
            this._AddressID = id;
        }
    }

    set setEmail(email: string)
    {
        if(this.validator.isEmail(email))
        {
            this._Email = email;
        }
    }

    set setPhoneNumber(pNum: string)
    {
        if(this.validator.isPhoneNumber(pNum))
        {
            this._PhoneNumber = pNum;
        }
    }

    set setPassword(pass: string)
    {
        if(this.validator.isPassword(pass))
        {
            this._Password = pass;
        }
    }

    //methods
    readAll(): Client[]
    {
        let clients: Client[] = [];
        let db = new Database();
        let conn = db.connect();

        let query: string = "Select * FROM clients";
        let res = conn.query(query, (err: Error, tmpClients: Client[]) =>
        {
            if (err) throw err;
            tmpClients.forEach(client => {
                clients.push(client);
            });
            conn.destroy();
            //console.log(clients);
            //return tmpClients;
        });
        //console.log(clients);
        return clients;
    }

    readClient(id: number): Client
    {
        let c = new Client();
        let db = new Database();
        let conn = db.connect();

        let query: string = "Select * FROM users Where UID = ?";
        conn.query(query, id , (err: unknown, client: Client) =>
        {
            if (err) throw err;
            c = client;
            conn.destroy();
        });
        
        return c;
    }

    insert(client: Client): boolean
    {
        return true;
    }

    update(client: Client): boolean
    {
        return true;
    }

    delete(id: number): boolean
    {
        return true;
    }
}