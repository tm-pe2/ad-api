import { Database } from './database';
import { Validation } from './typeValidation';

export class Customer
{
    private validator = new Validation();
    private ClientID: number = 0;
    private Firstname: string = '';
    private Lastname: string = '';
    private Birthdate: Date = new Date;
    private AdressID: number = 0;
    private Email: string = '';
    private PhoneNumber: string = '';
    private Password: string = '';

    constructor(fName: string='default', lName: string = 'default', bDate = new Date('1990-01-01'), addID: number = 0, email: string = 'default', pNumber: string = 'default', password: string = 'default', id: number = 0)
    {
        if(fName == '' && lName == '' && bDate == new Date('1990-01-01'))
        {
            this.ClientID =id;
            this.Firstname = fName;
            this.Lastname = lName;
            this.Birthdate = bDate;
            this.AdressID = addID;
            this.Email = email;
            this.PhoneNumber = pNumber;
            this.Password = password;
        }
        else
        {
            if( this.validator.isName(fName) && this.validator.isName(lName) && this.validator.isDate(bDate) && this.validator.isID(addID) && this.validator.isEmail(email) && this.validator.isPhoneNumber(pNumber) && this.validator.isPassword(password) )
            {
                this.ClientID =id;
                this.Firstname = fName;
                this.Lastname = lName;
                this.Birthdate = bDate;
                this.AdressID = addID;
                this.Email = email;
                this.PhoneNumber = pNumber;
                this.Password = password;
            }
            else
            {
                console.log("Input not valid!");
            }
        }
        
    }

    // getters
    get getClientID(): number
    {
        return this.ClientID;
    }

    get getFirstName(): string
    {
        return this.Firstname;
    }

    get getLastName(): string
    {
        return this.Lastname;
    }

    get getBirthDate(): Date
    {
        return this.Birthdate;
    }

    get getAdressID(): number
    {
        return this.AdressID;
    }

    get getEmail(): string
    {
        return this.Email;
    }

    get getPhoneNumber(): string
    {
        return this.PhoneNumber;
    }

    get getPassword(): string
    {
        return this.Password;
    }


    //setters
    //should be used carefully
    set setClientID(id: number)
    {
        if(this.validator.isID(id))
        {
            this.ClientID = id;
        }
    }

    set setFirstname(fName: string)
    {
        if(this.validator.isName(fName))
        {
            this.Firstname = fName;
        }
    }

    set setLastname(lName: string)
    {
        if(this.validator.isName(lName))
        {
            this.Lastname = lName;
        }
    }

    set setBirthdate(bDate: Date)
    {
        if(this.validator.isDate(bDate))
        {
            this.Birthdate = bDate;
        }
    }

    set setAdressID(id: number)
    {
        if(this.validator.isID(id))
        {
            this.AdressID = id;
        }
    }

    set setEmail(email: string)
    {
        if(this.validator.isEmail(email))
        {
            this.Email = email;
        }
    }

    set setPhoneNumber(pNum: string)
    {
        if(this.validator.isPhoneNumber(pNum))
        {
            this.PhoneNumber = pNum;
        }
    }

    set setPassword(pass: string)
    {
        if(this.validator.isPassword(pass))
        {
            this.Password = pass;
        }
    }

    //methods
    toJSON()
    {
        return {
            FirstName: this.getFirstName,
            LastName: this.getLastName,
            BirthDate: this.getBirthDate,
            AdressID: this.getAdressID,
            Email: this.getEmail,
            PhoneNumber: this.getPhoneNumber,
            Password: this.getPassword
        }
    }

    async readAll(): Promise<Customer[]>
    {
        let clients: Customer[] = [];
        let db = new Database();
        let conn = db.connect();

        let query: string = "Select * FROM clients";

        await(new Promise((resolve, reject) => {
            conn.query(query, (err: Error, tmpClients: Customer[]) => {
                if (err) reject(err);
                tmpClients.forEach(client => {
                    clients.push(client);
                });
                resolve(tmpClients);
            });
        }));

        conn.destroy();
        console.log(clients);
        return clients;
    }

    async readClient(id: number): Promise<Customer>
    {
        let client = new Customer();
        let db = new Database();
        let conn = db.connect();

        let query: string = "Select * FROM clients Where ClientID = ?";
        await(new Promise((resolve, reject) => {
            conn.query(query, [id], (err: unknown, c: Customer) => {
                if (err) reject(err);
                client = c
                resolve(c);
            });
        }));

        conn.destroy();
        return client;
    }

    async insert(): Promise<boolean>
    {
        let status: boolean = true;
        let db = new Database();
        let conn = db.connect();
        let query: string = `INSERT INTO clients SET ?`;
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
        let query: string = `UPDATE clients SET 
        FirstName = ?,
        LastName = ?,
        BirthDate = ?,
        AdressID = ?,
        Email = ?,
        PhoneNumber = ?,
        Password = ? Where ClientID = ? `;
        await(new Promise((resolve, reject) => {
            let res = conn.query(query,
            [
                this.getFirstName,
                this.getLastName,
                this.getBirthDate,
                this.getAdressID,
                this.getEmail,
                this.getPhoneNumber,
                this.getPassword,
                this.getClientID
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
        let query: string = "DELETE FROM clients Where ClientID = ?";

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