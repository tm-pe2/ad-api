import {Request, RequestHandler, Response} from 'express';
import {Customer, customerSchema} from '../classes/customer';
import * as customerService from '../services/customer-service';
import {User, userSchema} from '../classes/user';
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

export const addCustomer: RequestHandler = async (req: Request, res: Response) => {
    try {
        const usr = {
            "RoleID": 1,
            "FirstName": req.body.FirstName,
            "LastName": req.body.LastName,
            "BirthDate": req.body.BirthDate,
            "AddressID": req.body.AddressID,
            "Email": req.body.Email,
            "PhoneNumber": req.body.PhoneNumber,
            "Password": req.body.Password,
        }
        const addUserSchema = userSchema.fork('UserID', field => field.optional());
        const validationResult = await addUserSchema.validateAsync(usr);
        let user: User = validationResult;

        if (Object.keys(await userService.getUserByEmail(user.Email)).length !== 0) {
            throw new Error("User already exists");
        }

        //generate the salt to hash the password
        const salt = await bcrypt.genSalt(10);
        user.Password = await bcrypt.hash(validationResult.Password,salt);
        
        //insert the user
        const insertResult = await userService.insertUser(user);

        if(insertResult !== true)
        {
            throw new Error("Customer already exists");
        }

        const resul = await userService.getLastUserID();
        const val = JSON.parse(JSON.stringify(resul));
        const cus = {
            "CustomerID": Number(val[0].UserID),
            "GasType": req.body.GasType,
            "Electricitytype": req.body.Electricitytype
        }
        const customerValidationResult = await customerSchema.validateAsync(cus)
        let customer: Customer = customerValidationResult;

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
        const usr = {
            "UserID": req.body.UserID,
            "RoleID": req.body.RoleID,
            "FirstName": req.body.FirstName,
            "LastName": req.body.LastName,
            "BirthDate": req.body.BirthDate,
            "AddressID": req.body.AddressID,
            "Email": req.body.Email,
            "PhoneNumber": req.body.PhoneNumber,
            "Password": req.body.Password,
        }

        const userValidationResult = await userSchema.validateAsync(usr);
        let user: User = userValidationResult;

        //generate the salt to hash the password
        const salt = await bcrypt.genSalt(10);
        user.Password = await bcrypt.hash(userValidationResult.Password,salt);
        
        const uesrUpdateResult = await userService.UpdateUser(user);
        if(uesrUpdateResult !== true)
        {
            throw new Error("Update failed!");
        }

        const cus = {
            "CustomerID": Number(req.body.UserID),
            "GasType": req.body.GasType,
            "Electricitytype": req.body.Electricitytype
        }
        const customerValidationResult = await customerSchema.validateAsync(cus)
        let customer: Customer = customerValidationResult;

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
