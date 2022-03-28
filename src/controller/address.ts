/** source/controllers/clients.ts */
import { Request, Response, NextFunction } from 'express';
import { Address } from '../classes/address';

// get all addresses
const getAddresses = async (req: Request, res: Response, next: NextFunction) => {
    let address = new Address();
    return res.status(200).json(await address.readAll())
};

// get one address
const getAddress = async (req: Request, res: Response, next: NextFunction) => {
    let address = new Address();
    return res.status(200).json(await address.readAddress(Number(req.params.id)));
};

// update address
const updateAddress = async (req: Request, res: Response, next: NextFunction) => {
    let address = new Address(req.body.City,req.body.Street,req.body.HouseNumber,req.body.PostalCode,req.body.City,Number(req.body.AdressID));
    if(await address.update())
    {
        return res.status(200).json({"Status": "Address updated sucessfully!"})
    }
    else
    {
        return res.status(404).json({"Status" : "Something went wrong!"});
    }
};

// delete a address
const deleteAddress = async (req: Request, res: Response, next: NextFunction) => {
    let address = new Address();
    if(await address.delete(Number(req.params.id)))
    {
        return res.status(200).json({"Status": "Address deleted sucessfully!"})
    }
    else
    {
        return res.status(404).json({"Status" : "Something went wrong!"});
    }
};

// add a address
const addAddress = async (req: Request, res: Response, next: NextFunction) => {
    let address = new Address(req.body.City,req.body.Street,req.body.HouseNumber,req.body.PostalCode,req.body.Country);
    if (await address.insert())
    {
        return res.status(200).json({"Status" : "Address inserted sucessfully!"});
    }
    else
    {
        return res.status(404).json({"Status" : "Something went wrong!"});
    }
};

export default { getAddresses, getAddress, addAddress, updateAddress, deleteAddress };