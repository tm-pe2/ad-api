/** source/controllers/clients.ts */
import { Request, Response, NextFunction } from 'express';
var mysql = require('mysql');

var conn = mysql.createConnection({
        host: "localhost",
        user: "Webuser",
        password: "Lab2021",
        database: "webshop"
    });

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

// get all clients
const getClients = async (req: Request, res: Response, next: NextFunction) => {
    conn.connect(function (err:Error) {
        if(err){
            console.log("error occured while connecting");
        }
        else{
            console.log("connection created with Mysql successfully");
        }});

    return res.status(200).json({
        message: "This is get all clients route"
    });
};

// get one client
const getClient = async (req: Request, res: Response, next: NextFunction) => {
    // get the client id from the req
    let id: string = req.params.id;
    return res.status(200).json({
        message: "This is get one client route"
    });
};

// update a client
const updateClient = async (req: Request, res: Response, next: NextFunction) => {
    // get the client id from the req.params
    let id: string = req.params.id;
    // get the data from req.body
    //let name: string = req.body.name ?? null;
    return res.status(200).json({
        message: "This is update client route"
    });
};

// delete a client
const deleteClient = async (req: Request, res: Response, next: NextFunction) => {
    // get the client id from req.params
    let id: string = req.params.id;
    return res.status(200).json({
        message: "This is delete client route"
    });
};

// add a client
const addClient = async (req: Request, res: Response, next: NextFunction) => {
    // get the data from req.body
    //let name: string = req.body.name ?? null;
    return res.status(200).json({
        message: "This is add client route"
    });
};

export default { getClients, getClient, updateClient, deleteClient, addClient };