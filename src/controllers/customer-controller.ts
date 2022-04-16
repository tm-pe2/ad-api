import {NextFunction, Request, RequestHandler, Response} from 'express';
import {Customer, customerSchema} from '../classes/customer';
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

export const addCustomer: RequestHandler = async (req: Request, res: Response) => {
    try {
        //validate the request body
        const validationResult = await customerSchema.validateAsync(req.body);
        let customer: Customer = validationResult;

        //check if customer exists
        const existCheck = await customerService.getCustomerByEmail(customer.Email);
        if (existCheck)
        {
            return res.status(500).json({
                message: 'Customer already exists!'
            });
        }

        //generate the salt to hash the password
        const salt = await bcrypt.genSalt(10);
        customer.Password = await bcrypt.hash(validationResult.Password,salt);
        
        //insert the customer
        const result = await customerService.insertCustomer(customer);

        res.status(200).json({
            result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when adding new customer!'
        });
    }
};

export const updateCustomer: RequestHandler = async (req: Request, res: Response) => {
    try {
        //validate the request body
        const validationResult = await customerSchema.validateAsync(req.body);
        let customer: Customer = validationResult;

        //generate the salt to hash the password
        const salt = await bcrypt.genSalt(10);
        customer.Password = await bcrypt.hash(validationResult.Password,salt);

        //update customer
        const result = await customerService.UpdateCustomer(customer);

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
        const result = await customerService.deleteCustomer(Number(req.params.id));

        res.status(200).json({
            result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when deleting customer'
        });
    }
};
