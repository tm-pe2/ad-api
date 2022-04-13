import {NextFunction, Request, RequestHandler, Response} from 'express';
import * as contractService from '../services/contract-service';
import {Contract} from "../classes/contracts";

export const getAllContracts: RequestHandler = async (req: Request, res: Response) => {
    try {
        const contracts = await contractService.getAllContracts();

        res.status(200).json({
            contracts
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when fetching contracts'
        });
    }
};

export const getContractById: RequestHandler = async (req: Request, res: Response) => {
    try {
        const contract = await contractService.getContractById(Number(req.params.id));

        res.status(200).json({
            contract
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when fetching contract'
        });
    }
};

export const addContract: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let obj = req.body
        let contract: Contract = new Contract(null, obj.startDate, obj.endDate, obj.customerId, obj.customerType, obj.advancedPayment, obj.price, obj.tariffId, obj.estimatedId);
        const result = await contractService.insertContract(contract);

        res.status(200).json({
            result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when adding new contract'
        });
    }
};

export const updateContract: RequestHandler = async (req: Request, res: Response) => {
    try {
        let obj = req.body
        let contract: Contract = new Contract(obj.contractId, obj.startDate, obj.endDate, obj.customerId, obj.customerType, obj.advancedPayment, obj.price, obj.tariffId, obj.estimatedId);

        const result = await contractService.updateContract(contract);

        res.status(200).json({
            result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when updating contract'
        });
    }
};

export const deleteContractById: RequestHandler = async (req: Request, res: Response) => {
    try {
        const result = await contractService.deleteContract(Number(req.params.id));

        res.status(200).json({
            result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when deleting contract'
        });
    }
};
