/** source/controllers/clients.ts */
import { Request, Response, NextFunction } from 'express';
import { Customer } from '../classes/customer';

// get all clients
const getClients = async (req: Request, res: Response, next: NextFunction) => {
    let client = new Customer();
    return res.status(200).json(await client.readAll())
};

// get one client
const getClient = async (req: Request, res: Response, next: NextFunction) => {
    let client: Customer = new Customer();
    return res.status(200).json(await client.readClient(Number(req.params.id)));
};

// update a client
const updateClient = async (req: Request, res: Response, next: NextFunction) => {
    let client: Customer = new Customer(req.body.FirstName,req.body.LastName,new Date(req.body.BirthDate),Number(req.body.AdressID),req.body.Email,req.body.PhoneNumber,req.body.Password,Number(req.body.ClientID));
    // if(await client.update())
    // {
    //     return res.status(200).json({"Status": "Customer updated sucessfully!"})
    // }
    // else
    // {
    //     return res.status(500).json({"Status" : "Something went wrong!"});
    // }
    return res.status(200).json({
         client
    })
};

// delete a client
const deleteClient = async (req: Request, res: Response, next: NextFunction) => {
    let client: Customer = new Customer();
    if(await client.delete(Number(req.params.id)))
    {
        return res.status(200).json({"Status": "Customer deleted sucessfully!"})
    }
    else
    {
        return res.status(500).json({"Status" : "Something went wrong!"});
    }
};

// add a client
const addClient = async (req: Request, res: Response, next: NextFunction) => {
    let client: Customer = new Customer(req.body.FirstName,req.body.LastName,new Date(req.body.BirthDate),Number(req.body.AdressID),req.body.Email,req.body.PhoneNumber,req.body.Password);
    if (await client.insert())
    {
        return res.status(200).json({"Status" : "Customer inserted sucessfully!"});
    }
    else
    {
        return res.status(500).json({"Status" : "Something went wrong!"});
    }
};

export default { getClients, getClient, updateClient, deleteClient, addClient };