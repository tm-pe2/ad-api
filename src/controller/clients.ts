/** source/controllers/clients.ts */
import { Request, Response, NextFunction } from 'express';
var mysql = require('mysql');

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

var conn = mysql.createConnection({
    host: "localhost",
    user: "Webuser",
    password: "Lab2021",
    database: "webshop"
});

conn.connect(function (err: Error) {
    if (err) {
        console.log("error occured while connecting");
    }
});

// get all clients
const getClients = async (req: Request, res: Response, next: NextFunction) => {
    conn.query("Select * FROM users", function (err: Error, clients: string) 
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
};

// update a client
const updateClient = async (req: Request, res: Response, next: NextFunction) => {
    // get the client id from the req.params
    let id: string = req.params.id;
    // get the data from req.body
    //let name: string = req.body.name ?? null;
};

// delete a client
const deleteClient = async (req: Request, res: Response, next: NextFunction) => {
    // get the client id from req.params
    let id: string = req.params.id;
};

// add a client
const addClient = async (req: Request, res: Response, next: NextFunction) => {
    // get the data from req.body
    //let name: string = req.body.name ?? null;
};

export default { getClients, getClient, updateClient, deleteClient, addClient };
