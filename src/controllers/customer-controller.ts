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

export const getCustomerByUserId: RequestHandler = async (req: Request, res: Response) => {
    try {
        const customer = await customerService.getCustomerByUserId(Number(req.params.id));

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
            message: 'There was an error when fetching contracts!'
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
        if(addressID){
            validatedCustomer.address_id = addressID;

            //insert user
            const userID = await userServices.addUser(validatedCustomer);
            if(userID){
                
                validatedCustomer.user_id = userID;
                //insert user-addresses
                if(await userAddressService.insertUserAddress(validatedCustomer)){
                    
                    //insert customer
                    if(await customerService.insertCustomer(validatedCustomer)){
                        
                        res.status(200).json({
                            message: "Customer inserted succesfully!"
                        });
                    }
                    else{
                        res.status(401).json({
                            message: "An error occured while insering customer!"
                        });
                    }
                }
                else{
                    res.status(401).json({
                        message: "An error occured while insering user-address!"
                    });
                }
            }
            else{
                res.status(401).json({
                    message: "An error occured while insering user!"
                });
            }
        }
        else{
            res.status(401).json({
                message: "An error occured while insering address!"
            });
        }   
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when inserting customer'
        });
    }
};

export const updateCustomer: RequestHandler = async (req: Request, res: Response) => {
    try {
        if(await customerService.updateCustomer(req.params.type,Number(req.params.id))){
            res.status(200).json({
                message: "Customer updated succesfully!"
            });
        }
        else{
            res.status(401).json({
                message: "An error occured while updating customer!"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when updating customer'
        });
    }
};

export const DeleteCustomerById: RequestHandler = async (req: Request, res: Response) => {
    try {
        if(await customerService.deleteCustomer(Number(req.params.id)))
        {
            res.status(200).json({
                message: "Customer deleted succesfully!"
            });
        }
        else{
            res.status(401).json({
                message: "An error occured!"
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when deleting customer'
        });
    }
};
