import {NextFunction, Request, RequestHandler, Response} from 'express';
import * as ContractService from '../services/contractService';
import {Contract} from "../classes/contracts";

export const getAllContracts: RequestHandler = async (req: Request, res: Response) => {
    try {
        const contracts = await ContractService.getAllContracts();

        res.status(200).json({
            contracts
        });
    } catch (error) {
        console.error('[ContractController][getAllContracts][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
        res.status(500).json({
            message: 'There was an error when fetching contracts'
        });
    }
};

export const getContractById: RequestHandler = async (req: Request, res: Response) => {
    try {
        const contract = await ContractService.getContractById(Number(req.params.id));

        res.status(200).json({
            contract
        });
    } catch (error) {
        console.error('[ContractController][getContractById][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
        res.status(500).json({
            message: 'There was an error when fetching contract'
        });
    }
};

export const addContract: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let obj = req.body //["contract"]; !! device which way to use (-> postman or test)
        let contract: Contract = new Contract(obj.StartDate, obj.EndDate, obj.clientID, obj.clientType, obj.advancedPayment, obj.Price); // to run validations
        const result = await ContractService.insertContract(contract);

        res.status(200).json({
            result
        });
    } catch (error) {
        next(error);
        //console.error('[customerController][addCustomer][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
        res.status(500).json({
            message: 'There was an error when adding new contract'
        });
    }
};

export const updateContract: RequestHandler = async (req: Request, res: Response) => {
    try {
        let obj = req.body
        let c: Contract = new Contract(obj.StartDate, obj.EndDate, obj.clientID, obj.clientType, obj.advancedPayment, obj.Price, obj.contractID);

        const result = await ContractService.updateContract(c);

        res.status(200).json({
            result
        });
    } catch (error) {
        console.error('[contractController][updateContract][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
        res.status(500).json({
            message: 'There was an error when updating contract'
        });
    }
};

export const deleteContractById: RequestHandler = async (req: Request, res: Response) => {
    try {
        const result = await ContractService.deleteContract(Number(req.params.id));

        res.status(200).json({
            result
        });
    } catch (error) {
        console.error('[ContractController][DeleteContractById][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
        res.status(500).json({
            message: 'There was an error when deleting contract'
        });
    }
};
