import {Request, RequestHandler, Response} from 'express';
import {Contract, contractSchema } from '../classes/contracts';
import {estimateConsumption} from '../classes/estimation';
import * as estimationServies from '../services/estimation-service';
import * as contractService from '../services/contract-service';
import * as customerContractServices from '../services/customer-contracts-service';
import * as customerServices from '../services/customer-service';

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
        const cusID = await customerServices.getCustomerIdByAddressId(contract.address_id);
        
        //insert estimation
        contract.estimated_consumption = estimateConsumption(contract);
        const estimationID = await estimationServies.insertEstimation(contract);
        contract.estimation_id = estimationID;

        //insert contract
        const contractID = await contractService.insertContract(contract);
        if(contractID)
        {
            if(await customerContractServices.insertCustomerContract(cusID,contractID))
            res.status(200).json({
                "contract_id": contractID
            });
        }
        else
        {
            res.status(401).json({
                message: "An error occured!"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when inserting contract'
        });
    }
};

export const updateContract: RequestHandler = async (req: Request, res: Response) => {
    try {
        //validate the request body
        let contract: Contract = await contractSchema.validateAsync(req.body);

        if(await contractService.updateContract(contract))
        {
            res.status(200).json({
                message: "Contract updated succefully!"
            });
        }
        else
        {
            res.status(401).json({
                message: "An error occured!"
            });
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when updating contract!'
        });
    }
};

export const deleteContractById: RequestHandler = async (req: Request, res: Response) => {
    try {
        if(await contractService.deleteContract(Number(req.params.id)))
        {
            res.status(200).json({
                message: "Contract delete succefully!"
            });
        }
        else
        {
            res.status(401).json({
                message: "An error occured!"
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when deleting contract'
        });
    }
};
