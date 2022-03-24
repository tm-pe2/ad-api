/** source/controllers/clients.ts */
import { Request, Response, NextFunction } from 'express';
import { Client } from '../classes/client';

// get all clients
const getClients = async (req: Request, res: Response, next: NextFunction) => {
    //let query: string = "Select * FROM users";
    // conn.query(query, (err: MysqlError, clients: string) =>
    // {
    //     if (err) throw err;
    //     return res.status(200).json({
    //     clients
    //     });
    // });

    let client = new Client();
    return res.status(200).json(client.readAll())
};

// get one client
const getClient = async (req: Request, res: Response, next: NextFunction) => {
    let query: string = "Select * FROM users Where UID = ?";
    // conn.query(query, [req.params.id] , (err: unknown, client: string) =>
    // {
    //     if (err) throw err;
    //     return res.status(200).json({
    //     client
    //     });
    // });
    return res.status(200).json({message: "clients route"})
};

// update a client
const updateClient = async (req: Request, res: Response, next: NextFunction) => {
    let query: string = `UPDATE users SET name = ?, lastname = ?, imagePath = ?, type = ?, username = ?, password = ? Where UID = ? `;
    // conn.query(query,
    // [
    //     req.body.name,
    //     req.body.lastname,
    //     req.body.imagePath,
    //     req.body.type,
    //     req.body.username,
    //     req.body.password,
    //     req.params.id
    // ]
    // //req.body
    // , (err: unknown , client: string) =>
    // {
    //     if (err) throw err;
    //     return res.status(200).json({
    //         "request id" : req.body.id,
    //         client
    //     });
    // });
    return res.status(200).json({message: "updateClients route"})
};

// delete a client
const deleteClient = async (req: Request, res: Response, next: NextFunction) => {
    let query: string = "DELETE FROM users Where UID= ?";
    // conn.query(query, [req.params.id], (err: unknown, client: string) =>
    // {
    //     if (err) throw err;
    //     return res.status(200).json({
    //     client
    //     });
    // });
    return res.status(200).json({message: "deleteClients route"})
};

// add a client
const addClient = async (req: Request, res: Response, next: NextFunction) => {
    let query: string = `INSERT INTO users SET ?`;
    // conn.query(query, req.body, (err: unknown, client: string) =>
    // {
    //     if (err) throw err;
    //     return res.status(200).json({
    //     client
    //     });
    // });
    return res.status(200).json({message: "addClients route"})
};

export default { getClients, getClient, updateClient, deleteClient, addClient };