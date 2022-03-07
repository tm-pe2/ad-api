/** source/controllers/clients.ts */
import { Request, Response, NextFunction } from 'express';
import { Database } from '../calsses/database';

interface Address {
    street: String;
    hNumber: Number;
    postCode: String;
    country: String;
}

interface Client {
    id: Number;
    name: String;
    lastname: String;
    birthday: Date;
    address: Address;
}

let db = new Database();
let conn = db.connect();

// get all clients
const getClients = async (req: Request, res: Response, next: NextFunction) => {
    let query: string = "Select * FROM users";
    conn.query(query, function (err: Error, clients: string) 
    {
        if (err) throw err;
        return res.status(200).json({
        clients
        });
    });
};


// get one client
const getClient = async (req: Request, res: Response, next: NextFunction) => {
    // get the client id from the req
    let id: string = req.params.id;
    let query: string = "Select * FROM users Where UID = " + id;
    conn.query(query, function (err: Error, client: string) 
    {
        if (err) throw err;
        return res.status(200).json({
        client
        });
    });
};

// update a client
const updateClient = async (req: Request, res: Response, next: NextFunction) => {
    // get the client id from the req.params
    let id: string = req.params.id;
    // get the data from req.body
    let { name, lastname, imagePath, type, username, password } = req.body;
    let query: string = `UPDATE users SET name="${name}", lastname="${lastname}",
                            imagePath="${imagePath}", type="${type}",
                            username="${username}", password="${password}"
                            Where UID = ` + id;
    
    conn.query(query, function (err: Error, client: string) 
    {
        if (err) throw err;
        return res.status(200).json({
            client
        });
    });
};

// delete a client
const deleteClient = async (req: Request, res: Response, next: NextFunction) => {
    // get the client id from req.params
    let id: string = req.params.id;
    let query: string = "DELETE FROM users Where UID = " + id;
    conn.query(query, function (err: Error, client: string) 
    {
        if (err) throw err;
        return res.status(200).json({
        client
        });
    });
};

// add a client
const addClient = async (req: Request, res: Response, next: NextFunction) => {
    // get the data from req.body
    let { name, lastname, imagePath, type, username, password } = req.body;

    let query: string = `INSERT INTO users (name, lastname, imagePath, type, username, password) VALUES ("${name}","${lastname}","${imagePath}","${type}","${username}","${password}")`;
    conn.query(query, function (err: Error, client: string) 
    {
        if (err) throw err;
        return res.status(200).json({
        client
        });
    });
};

export default { getClients, getClient, updateClient, deleteClient, addClient };