import {Request, RequestHandler, Response} from 'express';
import { customerSchema } from '../classes/customer';
import * as userServices from '../services/user-service';
import * as userAddressService from '../services/user-address-service';
import * as addressServices from '../services/address-service';
import * as userValidation from '../validations/user-validation';
import * as customerService from '../services/customer-service';
import * as bcrypt from 'bcrypt';

export const getAllCustomers: RequestHandler = async (req: Request, res: Response) => {
    try {
        const customers = await customerService.getAllCustomers();

        res.status(200).json({
            customers
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when fetching customers'
        });
    }
};

export const getCustomerById: RequestHandler = async (req: Request, res: Response) => {
    try {
        const customer = await customerService.getCustomerById(Number(req.params.id));

        res.status(200).json({
            customer
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when fetching customer'
        });
    }
};

export const getCustomerContractsByID: RequestHandler = async (req: Request, res: Response) => {
    try {
        const customer = await customerService.getCustomersContractsByID(Number(req.params.id));

        res.status(200).json({
            customer
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when fetching customer'
        });
    }
};

export const getCustomersContracts: RequestHandler = async (req: Request, res: Response) => {
    try {
        const customers = await customerService.getCustomersContracts();

        res.status(200).json({
            customers
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when fetching customers contracts'
        });
    }
};

export const addCustomer: RequestHandler = async (req: Request, res: Response) => {
    try {
        
        const addCustomerSchema = customerSchema.fork(['customer_id', 'user_id', 'address_id'], field => field.optional());
        const validatedCustomer = await addCustomerSchema.validateAsync(req.body);

        const validationResult = await userValidation.checkUserData(validatedCustomer);
        if (validationResult != '') {
            throw new Error(String(validationResult));
        }
        //hash password
        const salt = await bcrypt.genSalt(10);
        validatedCustomer.password = await bcrypt.hash(validatedCustomer.password, salt);

        //insert address
        const addressID = await addressServices.insertAddress(validatedCustomer);
        validatedCustomer.address_id = addressID;

        //insert user
        const userID = await userServices.addUser(validatedCustomer);
        validatedCustomer.user_id = userID;

        //insert user-addresses
        const userResult = await userAddressService.insertUserAddress(validatedCustomer);

        //insert customer
        const result = await customerService.insertCustomer(validatedCustomer);

        res.status(200).json({
            result
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
};

export const updateCustomer: RequestHandler = async (req: Request, res: Response) => {
    try {
        const result = "update route!";  // TODO !
        res.status(200).json({
            result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when updating customer'
        });
    }
};

export const DeleteCustomerById: RequestHandler = async (req: Request, res: Response) => {
    try {
        const userID = await customerService.deleteCustomer(Number(req.params.id));

        res.status(200).json({
            "Delted user id : ":userID,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when deleting customer'
        });
    }
};
