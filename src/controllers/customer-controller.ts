import {Request, RequestHandler, Response} from 'express';
import {customerSchema} from '../classes/customer';
import * as customerService from '../services/customer-service';
import * as userService from '../services/user-service';
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
        const addCustomerSchema = customerSchema.fork(['user_id', 'customer_id'], field => field.optional());
        const validatedCustomer = await addCustomerSchema.validateAsync(req.body);

        const existingUser = await userService.getUserByEmail(validatedCustomer.email)

        if (!!existingUser) {
            throw new Error("The provided email address is already registered");
        }

        const salt = await bcrypt.genSalt(10);
        validatedCustomer.password = await bcrypt.hash(validatedCustomer.password, salt);

        validatedCustomer.user_id = await userService.insertUser(validatedCustomer);
        const result = await customerService.insertCustomer(validatedCustomer);

        res.status(200).json({
            result
        });
    } catch (error) {
        console.log(error);
        if (error.message == "The provided email address is already registered")
        {
            res.status(400).json({
                message: error.message
            });
        }
        else {
            res.status(500).json({
                message: 'There was an error when adding new customer'
            });
        }
    }
};

export const updateCustomer: RequestHandler = async (req: Request, res: Response) => {
    try {


        const result = "hoi";
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
        const usrRes = await userService.deleteUser(Number(req.body.id));
        const result = await customerService.deleteCustomer(Number(req.params.id));

        res.status(200).json({
            usrRes,
            result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when deleting customer'
        });
    }
};
