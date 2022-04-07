import * as validator from '../classes/typeValidation';

export class Invoice {
    private InvoiceID: number = 0;
    private ClientID: number = 0;
    private SupplierID: number = 0;
    private Date: Date = new Date;
    private DueDate: Date = new Date;
    private Type: string = '';
    private Amount: number = 0;
    private Price: number = 0;
    private Tax: string = '';
    private Status: number = 0;

    constructor(clientID: number = 0, suppID: number = 0, date = new Date('1990-01-01'), dueDate = new Date('1990-01-01'), 
    type: string = 'default', amount: number = 0, price: number = 0, tax: string = 'default', status: number = 0, invID: number = 0)
    {
        if(validator.isID(clientID) && validator.isID(invID) && validator.isID(suppID)
        && validator.isDate(date) && validator.isDate(dueDate) && validator.isName(type)
        && validator.isID(amount) && validator.isID(price) && validator.isName(tax) && validator.isID(status))
        {
            this.InvoiceID = invID;
            this.ClientID = clientID;
            this.SupplierID = suppID;
            this.Date = date;
            this.DueDate = dueDate;
            this.Type = type;
            this.Amount = amount;
            this.Price = price;
            this.Tax = tax;
            this.Status = status;
        }
        else
        {
            console.log("Input not valid!");
        }
    }

    //getters
    get getInvoiceID(): number
    {
        return this.InvoiceID;
    }

    get getClientID(): number
    {
        return this.ClientID;
    }

    get getSupplierID(): number
    {
        return this.SupplierID;
    }

    get getDate(): Date
    {
        return this.Date;
    }

    get getDueDate(): Date
    {
        return this.DueDate;
    }

    get getType(): string
    {
        return this.Type;
    }

    get getAmount(): number
    {
        return this.Amount;
    }

    get getPrice(): number
    {
        return this.Price;
    }

    get getTax(): string
    {
        return this.Tax;
    }

    get getStatus(): number
    {
        return this.Status;
    }

    //setters
    set setInvoiceID(id: number)
    {
        if(validator.isID(id))
        {
            this.InvoiceID = id;
        }
    }

    set setClientID(id: number)
    {
        if(validator.isID(id))
        {
            this.ClientID = id;
        }
    }

    set setSupplierID(id: number)
    {
        if(validator.isID(id))
        {
            this.SupplierID = id;
        }
    }

    set setDate(date: Date)
    {
        if(validator.isDate(date))
        {
            this.Date = date;
        }
    }

    set setDueDate(date: Date)
    {
        if(validator.isDate(date))
        {
            this.DueDate = date;
        }
    }

    set setType(type: string)
    {
        if(validator.isName(type))
        {
            this.Type = type;
        }
    }

    set setAmount(amount: number)
    {
        if(validator.isID(amount))
        {
            this.Amount = amount;
        }
    }

    set setPrice(price: number)
    {
        if(validator.isID(price))
        {
            this.Price = price;
        }
    }

    set setTax(tax: string)
    {
        if(validator.isName(tax))
        {
            this.Tax = tax;
        }
    }

    set setStatus(status: number)
    {
        this.Status = status;
    }

    /*
    toJSON()
    {
        return {
            InvoiceID: this.InvoiceID,
            ClientID: this.ClientID,
            SupplierID: this.SupplierID,
            Date: this.Date,
            DueDate: this.DueDate,
            Type: this.Type,
            Amount: this.Amount,
            Price: this.Price,
            Tax: this.Tax,
            Status: this.Status
        }
    }

    async readAll(): Promise<Invoice[]>
    {
        let invoices: Invoice[] = [];
        let db = new Database();
        let conn = db.connect();

        let query: string = "Select * FROM invoices";

        await(new Promise((resolve, reject) => {
            conn.query(query, (err: Error, tmpInvoices: Invoice[]) => {
                if (err) reject(err);
                tmpInvoices.forEach(invoice => {
                    invoices.push(invoice);
                });
                resolve(tmpInvoices);
            });
        }));

        conn.destroy();
        return invoices;
    }

    async readInvoice(id: number): Promise<Invoice>
    {
        let invoice = new Invoice();
        let db = new Database();
        let conn = db.connect();

        let query: string = "Select * FROM invoices Where InvoiceID = ?";
        await(new Promise((resolve, reject) => {
            let res = conn.query(query, [id], (err: unknown, i: Invoice) => {
                if (err) reject(err);
                invoice = i;
                resolve(i);
            });
        }));

        conn.destroy();
        return invoice;
    }

    async insert(): Promise<boolean>
    {
        let status: boolean = true;
        let db = new Database();
        let conn = db.connect();
        let query: string = `INSERT INTO invoices SET ?`;
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
        let query: string = `UPDATE invoices SET 
        ClientID = ?,
        SupplierID = ?,
        Date = ?,
        DueDate = ?,
        Type = ?,
        Amount = ?,
        Price = ?,
        Tax = ?,
        Status = ? Where InvoiceID = ? `;
        await(new Promise((resolve, reject) => {
            let res = conn.query(query,
            [
                this.ClientID,
                this.SupplierID,
                this.Date,
                this.DueDate,
                this.Type,
                this.Amount,
                this.Price,
                this.Tax,
                this.Status,
                this.InvoiceID
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
        let query: string = "DELETE FROM invoices Where InvoiceID = ?";

        await(new Promise((resolve, reject) => {
            conn.query(query, id ,(err: unknown) => {
                if (err) reject(err);
                status = true;
                resolve(status);
            });
        }));

        conn.destroy();
        return status;
    }µ

     */
}
