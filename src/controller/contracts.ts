import { Request, Response, NextFunction } from 'express';
import { Contract } from '../classes/contracts';

// get all contracts
const getContracts = async (req: Request, res: Response, next: NextFunction) => {
    let contract = new Contract();
    return res.status(200).json(await contract.readAll())
};

// get one contract
const getContract = async (req: Request, res: Response, next: NextFunction) => {
    let contract = new Contract();
    return res.status(200).json(await contract.readContract(Number(req.params.id)));
};

// update contract
const updateContract = async (req: Request, res: Response, next: NextFunction) => {
    let contract = new Contract(req.body.StartDate, req.body.EndDate, Number(req.body.ClientID), req.body.ClientType, Number(req.body.AdvancedPayement), Number(req.body.Price), Number(req.body.ContractID));
    if(await contract.update())
    {
        return res.status(200).json({"Status": "Contract updated sucessfully!"})
    }
    else
    {
        return res.status(404).json({"Status" : "Something went wrong!"});
    }
};

// delete a contract
const deleteContract = async (req: Request, res: Response, next: NextFunction) => {
    let contract = new Contract();
    if(await contract.delete(Number(req.params.id)))
    {
        return res.status(200).json({"Status": "Contract deleted sucessfully!"})
    }
    else
    {
        return res.status(404).json({"Status" : "Something went wrong!"});
    }
};

// add a contract
const addContract = async (req: Request, res: Response, next: NextFunction) => {
    let contract = new Contract(req.body.StartDate, req.body.EndDate, Number(req.body.ClientID), req.body.ClientType, Number(req.body.AdvancedPayement), Number(req.body.Price));
    if (await contract.insert())
    {
        return res.status(200).json({"Status" : "Contract inserted sucessfully!"});
    }
    else
    {
        return res.status(404).json({"Status" : "Something went wrong!"});
    }
};

export default { getContracts, getContract, addContract, updateContract, deleteContract };