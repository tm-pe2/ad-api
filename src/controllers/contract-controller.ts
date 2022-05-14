import {Request, RequestHandler, Response} from 'express';
import {Contract, contractSchema } from "../classes/contracts";
import * as estimationServies from '../services/estimation-service';
import * as contractService from '../services/contract-service';
import * as contractValidation from '../validations/contract-validation'

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

export const addContract: RequestHandler = async (req: Request, res: Response) => {
    try {
        // input validation
        const addContractSchema = contractSchema.fork(['contract_id','estimation_id'], field => field.optional());
        let contract = await addContractSchema.validateAsync(req.body);

        // contract logic validation
        const validationResult = await contractValidation.checkContractData(contract);
        if (validationResult != '') {
            throw new Error(String(validationResult));
        }

        //insert estimation
        const estimationID = await estimationServies.insertEstimation(contract);
        contract.estimation_id = estimationID;

        //insert contract
        const contractID = await contractService.insertContract(contract);

        res.status(200).json({
            "contract_id": contractID
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
};

export const updateContract: RequestHandler = async (req: Request, res: Response) => {
    try {
        //validate the request body
        let contract: Contract = await contractSchema.validateAsync(req.body);

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
